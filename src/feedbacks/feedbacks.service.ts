import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from 'src/users/entities/user.entity';
import { FeedbackEntity } from './entities/feedback.entity';
import { FeedbacksRepository } from './feedbacks.repository';

@Injectable()
export class FeedbacksService {
  constructor(private feedbacksRepository: FeedbacksRepository) {}

  /**
   * @description find all feedbacks
   */
  async getAllFeedbacks(
    // authorId?: string,
    // toDate?: Date,
    // fromDate?: Date,
    // tags?: string[],
  ): Promise<Array<FeedbackEntity>> {
    const queryBuilder = this.feedbacksRepository
      .createQueryBuilder('feedbacks')
      .leftJoinAndSelect('feedbacks.cleint', 'cleint');


    return queryBuilder
      .addSelect('feedbacks.created_at')
      .orderBy('feedbacks.created_at', 'DESC')
      .limit(100)
      .getMany();
  }

  /**
   * @description find feedback by id
   */
  async getFeedback(id: string,client:UserEntity): Promise<FeedbackEntity> {
    return this.feedbacksRepository.findOne({id , cleint:client},{
      relations: ['cleint'],
    });
  }

  /**
   * @description delete feedback by id
   */
  async deleteFeedback(id: string,client:UserEntity): Promise<boolean> {
    const deleteResult = await this.feedbacksRepository.delete({ id , cleint:client});
    return deleteResult.affected === 1;
  }

  /**
   * @description create feedback
   */
  async createFeedback(
    feedback: Partial<FeedbackEntity>,
    predictionId:string,
    cleint: UserEntity,
  ): Promise<FeedbackEntity> {
    if (!feedback.title || !feedback.satisfied || !feedback.description) {
      throw new BadRequestException(
        'Feedback should have a title ,satisfaction and description',
      );
    }

    const newFeedback = new FeedbackEntity();
    newFeedback.title = feedback.title;
    newFeedback.satisfied = feedback.satisfied;
    newFeedback.description = feedback.description;
    // newFeedback.prediction = feedback.prediction;
    newFeedback.cleint = cleint;

    const savedFeedback = await this.feedbacksRepository.save(newFeedback);
    return savedFeedback;
  }
}
