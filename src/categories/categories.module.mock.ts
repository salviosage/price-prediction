import { Module } from '@nestjs/common';
import { RequiredAuthGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import {
  MockUsersRepositoryProvider,
  MockCategoriesRepositoryProvider,
  MockPasswordRepositoryProvider,
  MockSessionRepositoryProvider,
} from 'src/commons/mocks/mock.providers';

@Module({
  providers: [
    MockUsersRepositoryProvider,
    MockCategoriesRepositoryProvider,
    MockPasswordRepositoryProvider,
    MockSessionRepositoryProvider,
    RequiredAuthGuard,
    AuthService,
  ],
  exports: [
    MockUsersRepositoryProvider,
    MockCategoriesRepositoryProvider,
    MockPasswordRepositoryProvider,
    MockSessionRepositoryProvider,
    RequiredAuthGuard,
    AuthService,
  ],
})
export class MockCategoriesModule {}
