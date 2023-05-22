import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) { }

  getProfile() {
    return '/users/me';
  }

  async updateProfile(params: Partial<User>) {
    return `/users/me    ${params}`
  }

  async getProfileWishes() {
    return '/users/me/wishes'
  }

  async getUser(username: string) {
    return `/users/${username}`
  }

  async getUserWishes(username: string) {
    return `/users/${username}/wishes`
  }

  async findUser(params: Partial<User>) {
    return `/users/find   ${params}`
  }
}
