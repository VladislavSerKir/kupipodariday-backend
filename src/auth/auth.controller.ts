import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
// import { SigninUserDto } from 'src/users/dto/signin-user.dto';
import { UsersService } from 'src/users/users.service';
// import { User } from 'src/users/entities/user.entity';
import { LocalGuard } from './LocalGuard';
import { SigninUserDto } from 'src/users/dto/signin-user.dto';

@Controller('/')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) { }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    return await this.authService.signUp(body);

    // const user = await this.authService.signUp(body);

    // return this.authService.auth(user);
  }

  // @UseGuards(LocalGuard)
  @Post('/signin')
  async signIn(@Body() body: SigninUserDto) {
    // return this.authService.auth(body);

    return this.authService.signIn(body);
  }
}
