import { BaseEntity } from 'src/common/base.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { PredictionEntity } from 'src/predictions/entities/prediction.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('Feedback')
export class FeedbackEntity extends BaseEntity {
  @Column({ length: 240, nullable: false })
  title: string;

  @Column({  nullable: false})
  satisfied: boolean;

  @Column({ length: 10000, nullable: false })
  description: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'cleint' })
  cleint: UserEntity;

  @ManyToOne(() => PredictionEntity)
  @JoinColumn({ name: 'prediction' })
  prediction: PredictionEntity;


}
