import { BaseEntity } from 'src/common/base.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity('passwords')
export class PasswordEntity extends BaseEntity {
  @Column()
  userId: string;

  @JoinColumn({ name: 'userId' })
  @OneToOne(() => UserEntity)
  user: UserEntity;

  @Column({ nullable: false })
  password: string;
}
