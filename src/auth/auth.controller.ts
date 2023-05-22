import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SigninUserDto } from 'src/users/dto/signin-user.dto';
import { UsersService } from 'src/users/users.service';

@Controller('/')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) { }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    return this.authService.signUp(body);
  }

  @Post('/signin')
  async signIn(@Body() body: SigninUserDto) {
    return this.authService.signIn(body);
  }
}
