import { IsEmail, IsString } from 'class-validator';
// import { CreateUserDto } from './create-user.dto';

export class FindUserDto {
  @IsString()
  query: string;
}
