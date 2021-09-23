import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordEntity } from 'src/auth/entities/passwords.entity';
import { SessionsEntity } from 'src/auth/entities/sessions.entity';
import { FeedbackEntity } from 'src/feedbacks/entities/feedback.entity';
import { PredictionEntity } from 'src/predictions/entities/prediction.entity';
import { SubscriptionEntity } from 'src/subscriptions/entities/subscriptions.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import * as dotenv from 'dotenv';
dotenv.config();
@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_URL,
      synchronize: true,
      logger: 'advanced-console',
      logging: 'all',
      entities: [
        UserEntity,
        FeedbackEntity,
        PredictionEntity,
        SubscriptionEntity,
        PasswordEntity,
        SessionsEntity,
      ],
    }),
  ],
})
export class ProdDbModule {}

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: process.env.TES_DATABASE_USERNAME,
      password: process.env.TEST_DATABASE_PASSWORD,
      database: process.env.TEST_DATABASE_URL,
      synchronize: true,
      dropSchema: true,
      logger: 'advanced-console',
      logging: 'all',
      entities: [
        UserEntity,
        FeedbackEntity,
        PredictionEntity,
        SubscriptionEntity,
        PasswordEntity,
        SessionsEntity,
      ],
    }),
  ],
})
export class TestDbModule {}
