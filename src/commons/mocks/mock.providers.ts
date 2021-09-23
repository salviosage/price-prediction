import { getCustomRepositoryToken, getRepositoryToken } from '@nestjs/typeorm';
import { PasswordEntity } from 'src/auth/passwords.entity';
import { SessionsEntity } from 'src/auth/sessions.entity';
import { IncomesRepository } from 'src/incomes/incomes.repository';
import { ExpensesRepository } from 'src/expenses/expenses.repository';
import { CategoriesRepository } from 'src/categories/categories.repository';

import { UsersRepository } from 'src/users/users.repository';
import { MockExpensesRepository } from './expenses.repository.mock';
import { MockIncomesRepository } from './incomes.repository.mock';
import { MockCategoriesRepository } from './categories.repository.mock';

import { MockUsersRepository } from './users.repository.mock';

export const MockUsersRepositoryProvider = {
  provide: getCustomRepositoryToken(UsersRepository),
  useClass: MockUsersRepository,
};

export const MockExpensesRepositoryProvider = {
  provide: getCustomRepositoryToken(ExpensesRepository),
  useClass: MockExpensesRepository,
};
export const MockIncomesRepositoryProvider = {
  provide: getCustomRepositoryToken(IncomesRepository),
  useClass: MockIncomesRepository,
};
export const MockCategoriesRepositoryProvider = {
  provide: getCustomRepositoryToken(CategoriesRepository),
  useClass: MockCategoriesRepository,
};

export const MockPasswordRepositoryProvider = {
  provide: getRepositoryToken(PasswordEntity),
  useValue: {},
};

export const MockSessionRepositoryProvider = {
  provide: getRepositoryToken(SessionsEntity),
  useValue: {},
};
