import { IsEmail, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(1)
  @MaxLength(64)
  usename: string;

  @IsString()
  @MinLength(0)
  @MaxLength(200)
  about: string;

  @IsUrl()
  avatar: string

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(2)
  password: string;
}
