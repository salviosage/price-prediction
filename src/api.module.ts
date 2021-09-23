import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ExpensesModule } from './expenses/expenses.module';
import { IncomesModule } from './incomes/incomes.module';
import { CategoriesModule } from './categories/categories.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    CategoriesModule,
    IncomesModule,
    ExpensesModule,
    AuthModule,
  ],
})
export class ApiModule {}
