import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PredictionsModule } from 'src/predictions/predictions.module';
import { SubscriptionsModule } from 'src/subscriptions/subscriptions.module';
import { FeedbacksModule } from 'src/feedbacks/feedbacks.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule, SubscriptionsModule, PredictionsModule, FeedbacksModule, AuthModule],
})
export class FeaturesModule {}
