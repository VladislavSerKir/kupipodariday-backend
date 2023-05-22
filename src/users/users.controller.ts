import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) { }

  @Get('/me')
  getProfileInfo() {
    return this.usersService.getProfile();
  }

  @Patch('/me')
  editUser(@Body() body: UpdateUserDto) {
    return this.usersService.updateProfile(body)
  }

  @Get('/me/wishes')
  getProfileWishesInfo() {
    return this.usersService.getProfileWishes()
  }

  @Get(':username')
  getUserInfo(@Param('username') username: string) {
    return this.usersService.getUser(username)
  }

  @Get('/:username/wishes')
  getUserWishesInfo(@Param('username') username: string) {
    return this.usersService.getUserWishes(username)
  }

  @Post('/find')
  findUserInfo(@Body() body: FindUserDto) {
    return this.usersService.findUser(body)
  }
}
