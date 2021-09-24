import {
  Body,
  ForbiddenException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiProperty,
  ApiPropertyOptional,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/auth/auth.decorator';
import { RequiredAuthGuard } from 'src/auth/auth.guard';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

class UserCreateRequestBody {
  @ApiProperty() username: string;
  @ApiProperty() email: string;
  @ApiProperty() password: string;
  @ApiProperty() firstName?: string;
  @ApiProperty() lastName?: string;
  @ApiPropertyOptional() role?: string;

}

class UserUpdateRequestBody {
  @ApiPropertyOptional() password?: string;
  @ApiPropertyOptional() username?: string;
  @ApiPropertyOptional() firstName?: string;
  @ApiPropertyOptional() lastName?: string;
  @ApiPropertyOptional() role?: string;
}

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @Get('/@:username')
  async getUserByUsername(
    @User() authdUser: UserEntity,
    @Param('username') username: string): Promise<any> {
    const user = await this.userService.getUserByUsername(username,authdUser);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @Get('/:userid')
  async getUserByUserid(
    @User() authdUser: UserEntity,
    @Param('userid') userid: string): Promise<UserEntity> {
    const user = await this.userService.getUserByUserId(userid,authdUser);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @Get('/me')
  async getMyProfile(
    @User() authdUser: UserEntity): Promise<UserEntity> {
    const user = await this.userService.getMe(authdUser);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
  @Post('/')
  async createNewUser(
    @Body() createUserRequest: UserCreateRequestBody,
  ): Promise<UserEntity> {
    const user = await this.userService.createUser(
      createUserRequest,
      createUserRequest.password,
    );
    return user;
  }
  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @Patch('verify/:userid')
  async veerifyUser(
    @User() authdUser: UserEntity,
    @Param('userid') userid: string,
  ): Promise<UserEntity> {
   
    const user = await this.userService.verifyUser(userid, authdUser);
    return user;
  }

  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @Patch('/:userid')
  async updateUserDetails(
    @User() authdUser: UserEntity,
    @Param('userid') userid: string,
    @Body() updateUserRequest: UserUpdateRequestBody,
  ): Promise<UserEntity> {
    if (authdUser.id !== userid) {
      throw new ForbiddenException('You can only update your own user details');
    }
    const user = await this.userService.updateUser(userid, updateUserRequest,authdUser);
    return user;
  }
}
