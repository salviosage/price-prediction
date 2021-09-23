import { ExpenseEntity } from 'src/expenses/expenses.entity';
import { Repository } from 'typeorm';

export class MockExpensesRepository extends Repository<ExpenseEntity> {}
