import { BaseEntity } from 'src/commons/base.entity';
import { UserEntity } from 'src/users/users.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('posts')
export class CategoryEntity extends BaseEntity {
  @Column({ length: 240, nullable: true })
  name: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'owner_id' })
  created_by: UserEntity;

  @Column({ name: 'amount', default: 0 })
  amount: number;
}
