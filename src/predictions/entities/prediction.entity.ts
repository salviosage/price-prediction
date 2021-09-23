import { BaseEntity } from 'src/common/base.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('Prediction')
export class PredictionEntity extends BaseEntity {
  @Column({ length: 240, nullable: false })
  from: string;

  @Column({ length: 500, nullable: false })
  to: string;

  @Column({  nullable: false })
  distance: Number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'client' })
  client: UserEntity;

 
}
