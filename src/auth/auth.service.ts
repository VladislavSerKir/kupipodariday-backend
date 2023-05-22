import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";


@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>) { }

    async signUp(body: Partial<User>) {
        return `${body}`
    }

    async signIn(body: Partial<User>) {
        return `${body}`
    }
}