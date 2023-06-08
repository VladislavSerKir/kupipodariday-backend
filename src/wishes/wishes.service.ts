import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
// import { CreateWishDto } from './dto/create-wish.dto';
// import { CreateOfferDto } from 'src/offers/dto/create-offer.dto';

@Injectable()
export class WishesService {
  constructor(@InjectRepository(Wish) private wishRepo: Repository<Wish>) { }

  async createWish(body, userInfo) {
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
    return this.wishRepo.find({
      where: {},
      order: { createdAt: 'DESC' },
      take: 40,
    });
  }

  async getTopWish() {
    return this.wishRepo.find({
      where: {},
      order: { copied: 'ASC' },
      take: 40,
    });
  }

  async getWishById(id: number) {
    const wish = await this.wishRepo.findOne({
      where: { id },
      relations: ['owner']
    });
    if (!wish) {
      throw new NotFoundException(`Подарка с id: ${id} не существует`);
    } else {
      return wish;
    }
  }

  async updateWish(id: number, body, user: User) {
    const wish = await this.getWishById(id);
    if (wish.owner.id !== user.id) {
      throw new ForbiddenException('Редактирование запрещено');
    } else {
      try {
        await this.wishRepo.update({ id }, { ...body });
        return this.getWishById(id);
      } catch (e) {
        throw new BadRequestException(`Запрос не сработал`);
      }
    }
  }

  async updateWishRaised(sponsoredWish: Wish, amount: number) {
    try {
      return this.wishRepo.update(
        { id: sponsoredWish.id },
        {
          raised: sponsoredWish.raised + amount,
        },
      );
    } catch {
      throw new BadRequestException(`Запрос не сработал`);
    }
  }

  async deleteWish(id: number) {
    return await this.wishRepo.delete({ id })
      .catch(() => {
        throw new NotFoundException(`Ошибка сервера`);
      })
  }

  async copyWish(id: number, user: User) {
    const wish = await this.getWishById(id);
    if (wish.owner.id === user.id) {
      throw new BadRequestException('Разрешено копировать только чужие подарки');
    }
    const newWish = await this.createWish({ ...wish, copied: wish.copied + 1 }, user);
    return newWish;
  }
}
