import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from 'src/users/entities/user.entity';
import { SubscriptionEntity } from './entities/subscriptions.entity';
import { SubscriptionsRepository } from './subscriptions.repository';

@Injectable()
export class SubscriptionsService {
  constructor(private subscriptionsRepository: SubscriptionsRepository) {}

  /**
   * @description find all subscriptions
   */
  async getAllSubscriptions(
    subscriber?: string,
    toDate?: Date,
    fromDate?: Date,
    tags?: string[],
  ): Promise<Array<SubscriptionEntity>> {
    const queryBuilder = this.subscriptionsRepository
      .createQueryBuilder('subscriptions')
      .leftJoinAndSelect('subscriptions.subscriber', 'subscriber');

    if (subscriber) {
      queryBuilder.where(`subscriptions.subscriber = :subscriber`, { subscriber });
    }
 

    return queryBuilder
      .addSelect('subscriptions.created_at')
      .orderBy('subscriptions.created_at', 'DESC')
      .limit(100)
      .getMany();
  }

  /**
   * @description find subscription by id
   */
  async getSubscription(id: string): Promise<SubscriptionEntity> {
    return this.subscriptionsRepository.findOne(id, {
      relations: ['subscriber'],
    });
  }

  /**
   * @description delete subscription by id
   */
  async deleteSubscription(id: string): Promise<boolean> {
    const deleteResult = await this.subscriptionsRepository.delete({ id });
    return deleteResult.affected === 1;
  }

  /**
   * @description create subscription
   */
  async createSubscription(
    subscription: Partial<SubscriptionEntity>,
    subscriber: UserEntity,
  ): Promise<SubscriptionEntity> {
    if (!subscription.amount || !subscription.upTo ) {
      throw new BadRequestException(
        'Subscription should have a amount ,Expired date and may be description',
      );
    }

    const newSubscription = new SubscriptionEntity();
    newSubscription.amount = subscription.amount;
    newSubscription.upTo = subscription.upTo;
    newSubscription.description = subscription.description;
    newSubscription.subscriber = subscriber;

    const savedSubscription = await this.subscriptionsRepository.save(newSubscription);
    return savedSubscription;
  }
}
