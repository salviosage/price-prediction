import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordEntity } from 'src/auth/passwords.entity';
import { SessionsEntity } from 'src/auth/sessions.entity';
import { IncomeEntity } from 'src/incomes/incomes.entity';
import { ExpenseEntity } from 'src/expenses/expenses.entity';
import { CategoryEntity } from 'src/categories/categories.entity';
import { UserEntity } from 'src/users/users.entity';
import * as dotenv from 'dotenv';
dotenv.config();
@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_URL,
      synchronize: true,
      logger: 'advanced-console',
      logging: 'all',
      entities: [
        UserEntity,
        CategoryEntity,
        ExpenseEntity,
        IncomeEntity,
        PasswordEntity,
        SessionsEntity,
      ],
    }),
  ],
})
export class ProdDbModule {}

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: process.env.TES_DATABASE_USERNAME,
      password: process.env.TEST_DATABASE_PASSWORD,
      database: process.env.TEST_DATABASE_URL,
      synchronize: true,
      dropSchema: true,
      logger: 'advanced-console',
      logging: 'all',
      entities: [
        UserEntity,
        CategoryEntity,
        ExpenseEntity,
        IncomeEntity,
        PasswordEntity,
        SessionsEntity,
      ],
    }),
  ],
})
export class TestDbModule {}
