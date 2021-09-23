import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/users.entity';
import { CategoryEntity } from 'src/categories/categories.entity';
import { ExpenseEntity } from './expenses.entity';
import { ExpensesRepository } from './expenses.repository';
import { CategoriesRepository } from 'src/categories/categories.repository';

@Injectable()
export class ExpensesService {
  constructor(
    private expensesRepository: ExpensesRepository,
    // @InjectRepository(CategoryEntity)
    private CategoryRepo: CategoriesRepository,
  ) {}
  /**
   * @description find all expenses
   */
  async getAllExpenses(userId?: string): Promise<Array<ExpenseEntity>> {
    const queryBuilder = this.expensesRepository
      .createQueryBuilder('expenses')
      .leftJoinAndSelect('expenses.created_by', 'created_by');

    if (userId) {
      queryBuilder.where(`expenses.created_by = :userId`, { userId });
    }

    return queryBuilder
      .addSelect('expenses.created_at')
      .orderBy('expenses.created_at', 'DESC')
      .limit(100)
      .getMany();
  }

  /**
   * @description find expense by id
   */
  async getExpense(id: string): Promise<ExpenseEntity> {
    return this.expensesRepository.findOne(id, {
      relations: ['created_by'],
    });
  }

  /**
   * @description delete expense by id
   */
  async deleteExpense(id: string): Promise<boolean> {
    const deleteResult = await this.expensesRepository.delete({ id });
    return deleteResult.affected === 1;
  }

  /**
   * @description create expense
   */
  async createExpense(
    expense: Partial<ExpenseEntity>,
    owner: UserEntity,
    category: string,
  ): Promise<ExpenseEntity> {
    if (!expense.title || !expense.amount) {
      throw new BadRequestException('Expense should have title and ammount');
    }

    const newExpense = new ExpenseEntity();
    newExpense.title = expense.title;
    newExpense.created_by = owner;

    if (category) {
      const cat = await this.CategoryRepo.findOne(category);
      if (!cat) {
        throw new NotFoundException('Category not foun not found');
      }
      newExpense.category = cat;
    }

    const savedExpense = await this.expensesRepository.save(newExpense);
    return savedExpense;
  }
}
