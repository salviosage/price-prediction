import { Body, Delete, Param, Post, Query, UseGuards } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiProperty,
  ApiPropertyOptional,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/auth/auth.decorator';
import { RequiredAuthGuard } from 'src/auth/auth.guard';
import { UserEntity } from 'src/users/users.entity';
import { ExpenseEntity } from './expenses.entity';
import { ExpensesService } from './expenses.service';

class ExpenseCreateRequestBody {
  @ApiProperty() title: string;
  @ApiProperty() amount: number;
  @ApiPropertyOptional() category: string;
}

class ExpenseDetailsQueryParams {
  @ApiPropertyOptional() authorId: string;
  @ApiPropertyOptional() hashtags: string[];
}

@ApiTags('expenses')
@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get('/')
  async getAllExpenses(
    @Query() query: ExpenseDetailsQueryParams,
  ): Promise<ExpenseEntity[]> {
    return await this.expensesService.getAllExpenses(query.authorId);
  }

  @Get('/:expenseId')
  async getExpenseDetails(
    @Param('expenseId') expenseId: string,
  ): Promise<ExpenseEntity> {
    return await this.expensesService.getExpense(expenseId);
  }

  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @Post('/')
  async createNewExpense(
    @User() owner: UserEntity,
    @Body() expense: ExpenseCreateRequestBody,
  ): Promise<ExpenseEntity> {
    const { category, ...rest } = expense;
    const createdExpense = await this.expensesService.createExpense(
      rest,
      owner,
      category,
    );
    return createdExpense;
  }

  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @Delete('/:expenseid')
  async deleteExpense(@Param('expenseid') expenseid: string): Promise<boolean> {
    return await this.expensesService.deleteExpense(expenseid);
  }
}
