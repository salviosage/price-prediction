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

}

class UserUpdateRequestBody {
  @ApiPropertyOptional() password?: string;
  @ApiPropertyOptional() username?: string;
  @ApiPropertyOptional() firstName?: string;
  @ApiPropertyOptional() lastName?: string;
}

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/@:username')
  async getUserByUsername(@Param('username') username: string): Promise<any> {
    const user = await this.userService.getUserByUsername(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Get('/:userid')
  async getUserByUserid(@Param('userid') userid: string): Promise<UserEntity> {
    const user = await this.userService.getUserByUserId(userid);

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
  @Patch('/:userid')
  async updateUserDetails(
    @User() authdUser: UserEntity,
    @Param('userid') userid: string,
    @Body() updateUserRequest: UserUpdateRequestBody,
  ): Promise<UserEntity> {
    if (authdUser.id !== userid) {
      throw new ForbiddenException('You can only update your own user details');
    }
    const user = await this.userService.updateUser(userid, updateUserRequest);
    return user;
  }
}
