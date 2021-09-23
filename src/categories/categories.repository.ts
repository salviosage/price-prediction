import { EntityRepository, Repository } from 'typeorm';
import { CategoryEntity } from './categories.entity';

@EntityRepository(CategoryEntity)
export class CategoriesRepository extends Repository<CategoryEntity> {}
