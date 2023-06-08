import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { hashPassword } from 'src/helpers/hash';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
  ) { }

  async getProfile(username: string): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { username },
      select: {
        username: true,
        about: true,
        id: true,
        createdAt: true,
        updatedAt: true,
        avatar: true,
        email: true,
      },
      relations: {
        wishes: true,
        offers: true,
      },
    });

    // const user = await this.userRepo.find({
    //   select: {
    //     username: username,
    //     about: true,
    //     id: true,
    //     createdAt: true,
    //     updatedAt: true,
    //     avatar: true,
    //     email: true,
    //   },
    //   relations: {
    //     wishes: true,
    //     offers: true,
    //   },
    // });

    if (!user) {
      throw new NotFoundException('Ошибка загрузки профиля')
    } else {
      return user
    }
  }

  async updateProfile(user: User, userData): Promise<UpdateResult> {
    const { password } = userData;

    if (password) {
      const hashedPassword = await hashPassword(password);
      userData = { ...userData, password: hashedPassword }
    }

    const updatedUser = await this.userRepo.update(user.id, userData);

    if (!updatedUser) {
      throw new BadRequestException('Ошибка запроса на изменение профиля');
    } else {
      return updatedUser;
    }
  }

  async getProfileWishes(username: string) {
    const user = await this.userRepo.findOne({
      where: {
        username
      },
      relations: ['wishes']
    });
    if (!user) {
      throw new NotFoundException('Список желаний пуст');
    } else {
      return user.wishes;
    }
  }

  async getUser(username: string) {
    // console.log(`/users/${username}`);
    const user = await this.userRepo.findOne({ where: { username } })
    if (!user) {
      throw new NotFoundException(`Пользователь ${username} не существует`);
    } else {
      // console.log(user)
      return user;
    }
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['wishlists', 'wishes', 'offers'],
    });
    if (!user) {
      throw new NotFoundException(`Пользователь с id: ${id} не существует`);
    } else {
      return user;
    }
  }

  async getUserWishes(username: string) {
    const user = await this.userRepo.findOneBy(
      { username }
    );
    if (!user) {
      throw new NotFoundException(`Пользователя ${username} не существует`);
    } else {
      return user.wishes;
    }
  }

  async findUser(query): Promise<User[]> {
    const user = await this.userRepo.find({ where: { username: query.username } });
    if (!user) {
      throw new NotFoundException(`Пользователя ${query.username} не существует`);
    } else {
      return user;
    }
  }
}
