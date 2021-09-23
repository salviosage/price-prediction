import { Module } from '@nestjs/common';
import { RequiredAuthGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import {
  MockUsersRepositoryProvider,
  MockIncomesRepositoryProvider,
  MockPasswordRepositoryProvider,
  MockSessionRepositoryProvider,
} from 'src/commons/mocks/mock.providers';

@Module({
  providers: [
    MockUsersRepositoryProvider,
    MockIncomesRepositoryProvider,
    MockPasswordRepositoryProvider,
    MockSessionRepositoryProvider,
    RequiredAuthGuard,
    AuthService,
  ],
  exports: [
    MockUsersRepositoryProvider,
    MockIncomesRepositoryProvider,
    MockPasswordRepositoryProvider,
    MockSessionRepositoryProvider,
    RequiredAuthGuard,
    AuthService,
  ],
})
export class MockIncomesModule {}
