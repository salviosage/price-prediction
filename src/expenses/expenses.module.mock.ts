import { Module } from '@nestjs/common';
import { RequiredAuthGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import {
  MockUsersRepositoryProvider,
  MockExpensesRepositoryProvider,
  MockPasswordRepositoryProvider,
  MockSessionRepositoryProvider,
  MockCategoriesRepositoryProvider,
} from 'src/commons/mocks/mock.providers';

@Module({
  providers: [
    MockUsersRepositoryProvider,
    MockExpensesRepositoryProvider,
    MockPasswordRepositoryProvider,
    MockSessionRepositoryProvider,
    MockCategoriesRepositoryProvider,
    RequiredAuthGuard,
    AuthService,
  ],
  exports: [
    MockUsersRepositoryProvider,
    MockExpensesRepositoryProvider,
    MockPasswordRepositoryProvider,
    MockSessionRepositoryProvider,
    MockCategoriesRepositoryProvider,
    RequiredAuthGuard,
    AuthService,
  ],
})
export class MockExpensesModule {}
