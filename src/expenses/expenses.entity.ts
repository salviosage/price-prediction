import { BaseEntity } from 'src/commons/base.entity';
import { UserEntity } from 'src/users/users.entity';
import { CategoryEntity } from 'src/categories/categories.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('posts')
export class ExpenseEntity extends BaseEntity {
  @Column({ length: 30, nullable: true })
  title: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'owner_id' })
  created_by: UserEntity;

  @ManyToOne(() => CategoryEntity)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @Column({ name: 'amount', default: 0 })
  amount: number;
}
