import { IsEmail } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class FindUserDto extends CreateUserDto {
    @IsEmail()
    query: string;
}
