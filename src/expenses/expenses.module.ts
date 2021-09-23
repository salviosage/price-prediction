import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpensesController } from './expenses.controller';
import { ExpensesRepository } from './expenses.repository';
import { ExpensesService } from './expenses.service';
import { CategoriesRepository } from 'src/categories/categories.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExpensesRepository, CategoriesRepository]),
  ],
  controllers: [ExpensesController],
  providers: [ExpensesService],
})
export class ExpensesModule {}
