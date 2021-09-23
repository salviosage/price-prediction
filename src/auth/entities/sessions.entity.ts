import { BaseEntity } from 'src/common/base.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('sessions')
export class SessionsEntity extends BaseEntity {
  @Column()
  userId: string;

  @JoinColumn({ name: 'userId' })
  @ManyToOne(() => UserEntity, { lazy: true })
  user: Promise<UserEntity>;
}
