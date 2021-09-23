import { BaseEntity } from 'src/common/base.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('Subscription')
export class SubscriptionEntity extends BaseEntity {

  @Column({  nullable: false })
  amount: number;

  @Column({ length: 10000, nullable: true })
  description: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'subscriber' })
  subscriber: UserEntity;



  @Column({ name: 'up_to',nullable: false  })
  upTo: Date;
}
