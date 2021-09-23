import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from 'src/users/users.entity';
import { IncomeEntity } from './incomes.entity';
import { IncomesRepository } from './incomes.repository';

@Injectable()
export class IncomesService {
  constructor(private incomesRepository: IncomesRepository) {}

  /**
   * @description find all incomes
   */
  async getAllIncomes(authorId?: string): Promise<Array<IncomeEntity>> {
    const queryBuilder = this.incomesRepository
      .createQueryBuilder('incomes')
      .leftJoinAndSelect('incomes.created_by', 'created_by');

    if (authorId) {
      queryBuilder.where(`incomes.created_by = :authorId`, { authorId });
    }

    return queryBuilder
      .addSelect('incomes.created_at')
      .orderBy('incomes.created_at', 'DESC')
      .limit(100)
      .getMany();
  }

  /**
   * @description find income by id
   */
  async getIncome(id: string): Promise<IncomeEntity> {
    return this.incomesRepository.findOne(id, {
      relations: ['created_by'],
    });
  }

  /**
   * @description delete income by id
   */
  async deleteIncome(id: string): Promise<boolean> {
    const deleteResult = await this.incomesRepository.delete({ id });
    return deleteResult.affected === 1;
  }

  /**
   * @description create income
   */
  async createIncome(
    income: Partial<IncomeEntity>,
    author: UserEntity,
  ): Promise<IncomeEntity> {
    if (!income.title || !income.amount) {
      throw new BadRequestException('Income should have a title and amount');
    }

    const newIncome = new IncomeEntity();
    newIncome.title = income.title;
    newIncome.created_by = author;

    const savedIncome = await this.incomesRepository.save(newIncome);
    return savedIncome;
  }
}
