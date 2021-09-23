import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncomesController } from './incomes.controller';
import { IncomesRepository } from './incomes.repository';
import { IncomesService } from './incomes.service';

@Module({
  imports: [TypeOrmModule.forFeature([IncomesRepository])],
  controllers: [IncomesController],
  providers: [IncomesService],
})
export class IncomesModule {}
