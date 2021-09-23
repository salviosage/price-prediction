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
import { SubscriptionEntity } from './entities/subscriptions.entity';
import { SubscriptionsService } from './subscriptions.service';

class SubscriptionCreateRequestBody {
  @ApiProperty() name: string;
  @ApiPropertyOptional() flier: string;
  @ApiProperty() description: string;
  @ApiProperty() heldOn: Date;
}

class SubscriptionDetailsQueryParams {
  @ApiPropertyOptional() authorId: string;
  @ApiPropertyOptional() toDate: Date;
  @ApiPropertyOptional() fromDate: Date;
  @ApiPropertyOptional() hashtags: string[];
}

@ApiTags('subscriptions')
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Get('/')
  async getAllSubscriptions(
    @Query() query: SubscriptionDetailsQueryParams,
  ): Promise<SubscriptionEntity[]> {
    return await this.subscriptionsService.getAllSubscriptions(
      query.authorId,
      query.toDate,
      query.fromDate,
      query.hashtags,
    );
  }

  @Get('/:subscriptionId')
  async getSubscriptionDetails(
    @Param('subscriptionId') subscriptionId: string,
  ): Promise<SubscriptionEntity> {
    return await this.subscriptionsService.getSubscription(subscriptionId);
  }

  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @Post('/')
  async createNewSubscription(
    @User() author: UserEntity,
    @Body() subscription: SubscriptionCreateRequestBody,
  ): Promise<SubscriptionEntity> {
    const createdSubscription = await this.subscriptionsService.createSubscription(subscription, author);
    return createdSubscription;
  }

  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @Delete('/:subscriptionid')
  async deleteSubscription(@Param('subscriptionid') subscriptionid: string): Promise<boolean> {
    return await this.subscriptionsService.deleteSubscription(subscriptionid);
  }
}
