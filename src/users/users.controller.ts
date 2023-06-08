import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { JwtGuard } from 'src/auth/JwtGuard';
import { User } from './entities/user.entity';
import { UpdateResult } from 'typeorm';
import { AuthUser } from 'src/decorators/user.decorator';
import { Wish } from 'src/wishes/entities/wish.entity';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) { }

  @UseGuards(JwtGuard)
  @Get('/me')
  getProfileInfo(@AuthUser() user: User): Promise<User> {
    return this.usersService.getProfile(user.username);
  }

  @UseGuards(JwtGuard)
  @Patch('/me')
  editUser(@AuthUser() user: User, @Body() userData: UpdateUserDto): Promise<UpdateResult> {
    return this.usersService.updateProfile(user, userData);
  }

  @UseGuards(JwtGuard)
  @Get('/me/wishes')
  getProfileWishesInfo(@AuthUser() user: User): Promise<Wish[]> {
    return this.usersService.getProfileWishes(user.username);
  }

  // @UseGuards(JwtGuard)
  @Get(':username')
  getUserInfo(@Param('username') username: string): Promise<User> {
    return this.usersService.getUser(username);
  }

  // @Get(':id')
  // findById(@Param('id') id: string) {
  //   return this.usersService.getUserById(+id)
  // }

  @Get('/:username/wishes')
  getUserWishesInfo(@Param('username') username: string): Promise<Wish[]> {
    return this.usersService.getUserWishes(username);
  }

  @UseGuards(JwtGuard)
  @Post('/find')
  findUserInfo(@Body() body: FindUserDto): Promise<User[]> {
    return this.usersService.findUser(body);
  }
}
