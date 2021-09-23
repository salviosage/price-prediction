import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserEntity } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private userRepo: UsersRepository,
    private authService: AuthService,
  ) {}
  /**
   * @description find a user with a given username
   * @returns {Promise<UserEntity>} user if found
   */
  public async getUserByUsername(username: string): Promise<UserEntity> {
    return await this.userRepo.findOne({ where: { username } });
  }

  /**
   * @description find a user with a given userid
   * @returns {Promise<UserEntity>} user if found
   */
  public async getUserByUserId(userId: string): Promise<UserEntity> {
    return await this.userRepo.findOne({ where: { id: userId } });
  }

  /**
   * @description create new user with given details
   * @returns {Promise<UserEntity>} user if created
   */
  public async createUser(
    user: Partial<UserEntity>,
    password: string,
  ): Promise<UserEntity> {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordReg =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (!re.test(String(user.email).toLowerCase())) {
      throw new BadRequestException('Email is not valid');
    }
   
    if (user.username.length < 5)
      throw new BadRequestException('Username must be of minimum 5 characters');
    if (!passwordReg.test(String(password).toLowerCase()))
      throw new BadRequestException(
        'Password must be of minimum 8 characters and should contain atleast one number and one special character',
      );

    const usernameAlreadyExists = await this.getUserByUsername(user.username);
    if (usernameAlreadyExists)
      throw new ConflictException('This username is already taken!');

    const newUser = await this.userRepo.save(user);

    await this.authService.createPasswordForNewUser(newUser.id, password);

    return newUser;
  }

  /**
   * @description update a user with given details
   * @returns {Promise<UserEntity>} user if updated
   */
  public async updateUser(
    userId: string,
    newUserDetails: Partial<UserEntity>,
  ): Promise<UserEntity> {
    const existingUser = await this.userRepo.findOne({
      where: { id: userId },
    });
    if (!existingUser) {
      return null;
    }
    if (newUserDetails.firstName)
      existingUser.firstName = newUserDetails.firstName;
    if (newUserDetails.lastName)
      existingUser.lastName = newUserDetails.lastName;

    return await this.userRepo.save(existingUser);
  }
}
