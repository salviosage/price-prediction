import {
  Body,
  Delete,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
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
import { IncomeEntity } from './incomes.entity';
import { IncomesService } from './incomes.service';

class IncomeCreateRequestBody {
  @ApiProperty() title: string;
  @ApiProperty() amount: number;
}

class IncomeDetailsQueryParams {
  @ApiPropertyOptional() authorId: string;
  @ApiPropertyOptional() hashtags: string[];
}

@ApiTags('incomes')
@Controller('incomes')
export class IncomesController {
  constructor(private readonly incomesService: IncomesService) {}

  @Get('/')
  async getAllIncomes(
    @Query() query: IncomeDetailsQueryParams,
  ): Promise<IncomeEntity[]> {
    return await this.incomesService.getAllIncomes(query.authorId);
  }

  @Get('/:incomeId')
  async getIncomeDetails(
    @Param('incomeId') incomeId: string,
  ): Promise<IncomeEntity> {
    return await this.incomesService.getIncome(incomeId);
  }

  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @Post('/')
  async createNewIncome(
    @User() author: UserEntity,
    @Body() income: IncomeCreateRequestBody,
  ): Promise<IncomeEntity> {
    const createdIncome = await this.incomesService.createIncome(
      income,
      author,
    );
    return createdIncome;
  }

  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @Delete('/:incomeid')
  async deleteIncome(@Param('incomeid') incomeid: string): Promise<boolean> {
    return await this.incomesService.deleteIncome(incomeid);
  }
}
