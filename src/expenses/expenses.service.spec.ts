import { Test, TestingModule } from '@nestjs/testing';
import { ExpensesService } from './expenses.service';
import {
  MockExpensesRepositoryProvider,
  MockCategoriesRepositoryProvider,
} from 'src/commons/mocks/mock.providers';

describe('ExpensesService', () => {
  let service: ExpensesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpensesService,
        MockCategoriesRepositoryProvider,
        MockExpensesRepositoryProvider,
      ],
    }).compile();

    service = module.get<ExpensesService>(ExpensesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
