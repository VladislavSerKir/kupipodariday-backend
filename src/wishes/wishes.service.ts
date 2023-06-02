import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WishesService {
  constructor(@InjectRepository(Wish) private wishRepo: Repository<Wish>) { }

  async createWish(body: Partial<Wish>, userInfo) {
    const { name, link, image, description, price } = body;
    const newWish = await this.wishRepo.create({
      owner: userInfo.id,
      name,
      link,
      image,
      description,
      price,
      copied: 0,
      raised: 0,
    })

    await this.wishRepo.save(newWish)
      .then((newWish) => newWish)
      .catch((e) => {
        throw new InternalServerErrorException(`Ошибка сервера ${e}`)
      })
    return newWish;
  }

  async getLastWish() {
    return '/wishes/last';
  }

  async getTopWish() {
    return '/wishes/top';
  }

  async getWishById(id: number) {
    const wish = await this.wishRepo.findOne({
      where: { id },
      relations: ['owner']
    });
    console.log(wish)
    if (!wish) {
      throw new NotFoundException(`Подарка с id: ${id} не существует`);
    } else {
      return wish;
    }
  }

  async updateWish(id: number, body: Partial<Wish>) {
    return `/wishes/${id}    ${body}`;
  }

  async deleteWish(id: number) {
    return await this.wishRepo.delete({ id })
      .catch(() => {
        throw new NotFoundException(`Ошибка сервера`);
      })
  }

  async copyWish(id: number) {
    return `/wishes/${id}  COPY`;
  }
}
