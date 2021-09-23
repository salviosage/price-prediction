import { IncomeEntity } from 'src/incomes/incomes.entity';
import { Repository } from 'typeorm';

export class MockIncomesRepository extends Repository<IncomeEntity> {}
