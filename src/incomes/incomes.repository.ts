import { EntityRepository, Repository } from 'typeorm';
import { IncomeEntity } from './incomes.entity';

@EntityRepository(IncomeEntity)
export class IncomesRepository extends Repository<IncomeEntity> {}
