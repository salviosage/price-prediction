import { BaseEntity } from 'src/commons/base.entity';
import { UserEntity } from 'src/users/users.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('incomes')
export class IncomeEntity extends BaseEntity {
  @Column({ length: 30, nullable: true })
  title: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'created_by' })
  created_by: UserEntity;

  @Column({ name: 'amount', default: 0 })
  amount: number;
}
