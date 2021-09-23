import { PasswordEntity } from 'src/auth/entities/passwords.entity';
import { BaseEntity } from 'src/common/base.entity';
import { Column, Entity, OneToOne } from 'typeorm';

@Entity('User')
export class UserEntity extends BaseEntity {
  @Column({ length: 30, nullable: false, unique: true })
  email: string;

  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: false, length: 50 })
  lastName: string;

  @Column({ nullable: false, length: 50 })
  firstName: string;


  

  @Column('boolean', { default: false })
  verified: boolean;

  @OneToOne((type) => PasswordEntity, (password) => password.user, {
    lazy: true,
    cascade: true,
  })
  userPassword: PasswordEntity;
}
