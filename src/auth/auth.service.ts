import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { Profile } from 'passport';
import { SigninUserDto } from 'src/users/dto/signin-user.dto';
import { IJwt } from './JwtStrategy';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
        private jwtService: JwtService,
        private usersService: UsersService
    ) { }

    async hashPassword(password) {
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(password, salt);
    }

    async signUp(createUserDto: CreateUserDto) {
        const { username, about, email, password, avatar } = createUserDto;
        const hashedPassword = await this.hashPassword(password);
        const newUser = this.userRepo.create({
            username,
            about,
            email,
            password: hashedPassword,
            avatar,
        });

        await this.userRepo.save(newUser)
            .then((newUser) => newUser)
            .catch((e) => {
                if (e.code === '23505') {
                    throw new ConflictException('Пользователь с указанным email уже существует');
                } else {
                    throw new InternalServerErrorException();
                }
            })

        return newUser;
    }

    async signIn(signinUserDto: SigninUserDto) {
        console.log('signIn', signinUserDto)
        const { username, password } = signinUserDto;
        const user = await this.usersService.getUser(username);

        if (user && (await bcrypt.compare(password, user.password))) {
            // const payload: IJwt = { userId: user.id };
            // const access_token: string = await this.jwtService.sign({ userId: user.id });
            const access_token: string = await this.jwtService.sign({ sub: user.id }, { secret: `${process.env.JWT_SECRET}` });

            console.log(access_token)
            return { access_token };
        } else {
            throw new UnauthorizedException('Проверьте логин или пароль');
        }
    }

    // auth(user: User) {
    //     const payload = { sub: user.id };

    //     return { access_token: this.jwtService.sign(payload) };
    // }

    async validatePassword(username: string, password: string) {
        const user = await this.usersService.getUser(username);
        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, ...result } = user;

            return user;
        }

        return null;
    }

    // async validateFromYandex(yandexProfile: Profile) {
    //     const user = await this.usersService.findByYandexID(yandexProfile.email);

    //     if (!user) {
    //         return await this.usersService.createFromYandex(yandexProfile);
    //     }

    //     return user;
    // }
}
