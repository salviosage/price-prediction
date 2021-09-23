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
import { UserEntity } from 'src/users/entities/user.entity';
import { FeedbackEntity } from './entities/feedback.entity';
import { FeedbacksService } from './feedbacks.service';

class FeedbackCreateRequestBody {
  @ApiProperty() title: string;
  @ApiPropertyOptional() satisfied: boolean;
  @ApiProperty() description: string;
  @ApiProperty() predictionId: string;
}

class FeedbackDetailsQueryParams {
  // @ApiPropertyOptional() authorId: string;
  // @ApiPropertyOptional() toDate: Date;
  // @ApiPropertyOptional() fromDate: Date;
  // @ApiPropertyOptional() hashtags: string[];
}

@ApiTags('feedbacks')
@Controller('feedbacks')
export class FeedbacksController {
  constructor(private readonly feedbacksService: FeedbacksService) {}

  @Get('/')
  async getAllFeedbacks(
    @Query() query: FeedbackDetailsQueryParams,
  ): Promise<FeedbackEntity[]> {
    return await this.feedbacksService.getAllFeedbacks(
    );
  }
  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @Get('/:feedbackId')
  async getFeedbackDetails(
    @User() client: UserEntity,
    @Param('feedbackId') feedbackId: string,
  ): Promise<FeedbackEntity> {
    return await this.feedbacksService.getFeedback(feedbackId,client);
  }

  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @Post('/')
  async createNewFeedback(
    @User() author: UserEntity,
    @Body() feedback: FeedbackCreateRequestBody,
  ): Promise<FeedbackEntity> {
    const createdFeedback = await this.feedbacksService.createFeedback(feedback,feedback.predictionId, author);
    return createdFeedback;
  }

  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @Delete('/:feedbackid')
  async deleteFeedback(
    @User() client: UserEntity,
    @Param('feedbackid') feedbackid: string): Promise<boolean> {
    return await this.feedbacksService.deleteFeedback(feedbackid,client);
  }
}
