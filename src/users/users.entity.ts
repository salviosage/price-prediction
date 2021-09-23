import { PasswordEntity } from 'src/auth/passwords.entity';
import { BaseEntity } from 'src/commons/base.entity';
import { Column, Entity, OneToOne } from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({ length: 30, nullable: false, unique: true })
  username: string;

  @Column({ nullable: true, length: 50 })
  name: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ nullable: true, length: 240 })
  bio?: string;

  @Column('boolean', { default: false })
  verified: boolean;

  @OneToOne((type) => PasswordEntity, (password) => password.user, {
    lazy: true,
    cascade: true,
  })
  userPassword: PasswordEntity;
}
