import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/users/users.entity';
import { CategoryEntity } from './categories.entity';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  /**
   * @description find all categories
   */
  async getAllCategories(ownerId?: string): Promise<Array<CategoryEntity>> {
    const queryBuilder = this.categoriesRepository
      .createQueryBuilder('categories')
      .leftJoinAndSelect('categories.created_by', 'created_by');

    if (ownerId) {
      queryBuilder.where(`categories.created_by = :ownerId`, { ownerId });
    }

    return queryBuilder
      .addSelect('categories.created_at')
      .orderBy('categories.created_at', 'DESC')
      .limit(100)
      .getMany();
  }

  /**
   * @description find category by id
   */
  async getCategory(id: string): Promise<CategoryEntity> {
    return this.categoriesRepository.findOne(id, {
      relations: ['created_by'],
    });
  }

  /**
   * @description delete category by id
   */
  async deleteCategory(id: string): Promise<boolean> {
    const deleteResult = await this.categoriesRepository.delete({ id });
    return deleteResult.affected === 1;
  }

  /**
   * @description create category
   */
  async createCategory(
    category: Partial<CategoryEntity>,
    owner: UserEntity,
  ): Promise<CategoryEntity> {
    if (!category.name || !category.amount) {
      throw new BadRequestException('Category have name and  contain amount');
    }
    const newCategory = new CategoryEntity();
    newCategory.name = category.name;
    newCategory.amount = category.amount;
    newCategory.created_by = owner;

    const savedCategory = await this.categoriesRepository.save(newCategory);
    return savedCategory;
  }
}
