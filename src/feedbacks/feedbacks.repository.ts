import { EntityRepository, Repository } from 'typeorm';
import { FeedbackEntity } from './entities/feedback.entity';

@EntityRepository(FeedbackEntity)
export class FeedbacksRepository extends Repository<FeedbackEntity> {}
