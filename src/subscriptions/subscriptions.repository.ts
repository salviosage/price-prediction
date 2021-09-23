import { EntityRepository, Repository } from 'typeorm';
import { SubscriptionEntity } from './entities/subscriptions.entity';

@EntityRepository(SubscriptionEntity)
export class SubscriptionsRepository extends Repository<SubscriptionEntity> {}
