import { Controller, Get, Post, Body, Patch, Param, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalGuard } from 'src/auth/LocalGuard';
import { JwtGuard } from 'src/auth/JwtGuard';
import { User } from './entities/user.entity';
// import { JwtGuard } from 'src/auth/JwtGuard';

@Controller('users')
// @UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) { }

  @UseGuards(JwtGuard)
  @Get('/me')
  getProfileInfo(@Req() req): Promise<User> {
    console.log(req.user)
    return this.usersService.getProfile(req.user.username);
  }

  @UseGuards(JwtGuard)
  @Patch('/me')
  editUser(@Req() req, @Body() userData: UpdateUserDto) {
    console.log('patch/me', userData, req.user)
    return this.usersService.updateProfile(req.user, userData);
  }

  @UseGuards(JwtGuard)
  @Get('/me/wishes')
  getProfileWishesInfo(@Req() req: any) {
    return this.usersService.getProfileWishes(req.user.username);
  }

  @UseGuards(JwtGuard)
  @Get('/:username')
  getUserInfo(@Param('username') username: string) {
    console.log(username, typeof (username))
    return this.usersService.getUser(username);
  }

  // @Get(':id')
  // findById(@Param('id') id: string) {
  //   return this.usersService.getUserById(+id)
  // }

  @Get('/:username/wishes')
  getUserWishesInfo(@Param('username') username: string) {
    return this.usersService.getUserWishes(username);
  }

  @UseGuards(JwtGuard)
  @Post('/find')
  findUserInfo(@Body() body: FindUserDto) {
    console.log(body)
    return this.usersService.findUser(body);
  }
}
