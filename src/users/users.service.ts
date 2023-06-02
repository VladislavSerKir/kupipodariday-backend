import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
  ) { }

  async getProfile(username: string) {
    console.log('/users/me');
    const user = await this.userRepo.findOne({
      where: { username }
    });
    // if (!user) {
    //   return new NotFoundException('Список желаний пуст');
    // }
    console.log(user);
    return user
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  async updateProfile(user, userData) {
    console.log(user, userData);
    const { password } = userData;

    if (password) {
      const hashedPassword = await this.hashPassword(password);
      userData = { ...userData, password: hashedPassword }
    }
    console.log(user.id)

    const updatedUser = await this.userRepo.update(user.id, userData);
    console.log(updatedUser)
    return updatedUser;
  }

  async getProfileWishes(username: string) {
    console.log('/users/me/wishes');
    const user = await this.userRepo.findOne({
      where: {
        username
      },
      relations: ['wishes']
    });
    if (!user) {
      return new NotFoundException('Список желаний пуст');
    }
    console.log(user.wishes)
    return user.wishes;
  }

  async getUser(username: string) {
    console.log(`/users/${username}`);
    const user = await this.userRepo.findOneBy({ username })
    if (!user) {
      throw new NotFoundException(`Пользователь ${username} не существует`);
    } else {
      console.log(user)
      return user;
    }
  }

  async getUserById(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });
    console.log(user)
    if (!user) {
      throw new NotFoundException(`Пользователь с id: ${id} не существует`);
    } else {
      return user;
    }
  }

  async getUserWishes(username: string) {
    console.log(`/users/${username}/wishes`);
  }

  async findUser(query) {
    console.log(query)
    const user = await this.userRepo.find({ where: { username: query.username } });
    console.log(user)
    if (!user) {
      throw new NotFoundException(`Пользователя ${query.username} не существует`);
    } else {
      return user;
    }
  }
}
