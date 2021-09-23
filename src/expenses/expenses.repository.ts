import { EntityRepository, Repository } from 'typeorm';
import { ExpenseEntity } from './expenses.entity';

@EntityRepository(ExpenseEntity)
export class ExpensesRepository extends Repository<ExpenseEntity> {}
