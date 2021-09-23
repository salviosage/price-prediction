import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbacksController } from './feedbacks.controller';
import { FeedbacksRepository } from './feedbacks.repository';
import { FeedbacksService } from './feedbacks.service';

@Module({
  imports: [TypeOrmModule.forFeature([FeedbacksRepository])],
  controllers: [FeedbacksController],
  providers: [FeedbacksService],
})
export class FeedbacksModule {}
