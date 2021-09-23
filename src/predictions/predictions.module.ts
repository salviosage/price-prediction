import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PredictionsController } from './predictions.controller';
import { PredictionsRepository } from './predictions.repository';
import { PredictionsService } from './predictions.service';

@Module({
  imports: [TypeOrmModule.forFeature([PredictionsRepository])],
  controllers: [PredictionsController],
  providers: [PredictionsService],
})
export class PredictionsModule {}
