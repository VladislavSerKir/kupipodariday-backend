import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { In, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist) private wishlistRepo: Repository<Wishlist>,
  ) { }

  async getWishlists() {
    const wishlists = await this.wishlistRepo.find({})
    if (!wishlists) {
      throw new NotFoundException(`Вишлисты не найдены`);
    }

    return wishlists;
  }

  async createWishlist(body, user) {
    const { name, image, itemsId } = body
    const wishItems = itemsId.map(item => { +item })
    // const wishItems = await this.wishlistRepo.find({
    //   where: { id: In(body.itemsId) },
    // });
    console.log(wishItems, itemsId)
    const newWishlist = await this.wishlistRepo.create({
      owner: user,
      name,
      image,
      items: wishItems,
    });

    try {
      const savedWishlist = await this.wishlistRepo.save(newWishlist)
      console.log(savedWishlist)
      return savedWishlist
    } catch {
      throw new BadRequestException(`Запрос не сработал`)
    }
  }

  async getWishlistById(id: number) {
    const wishlist = await this.wishlistRepo.findOne({
      where: { id },
      relations: ['items', 'owner'],
      // relations: {
      //   items: {
      //     offers: true,
      //     wishes: true,
      //   },
      //   items: {

      //   }
      // },
    });
    if (!wishlist) {
      throw new NotFoundException(`Вишлист не найден`);
    }
    console.log(wishlist)
    return wishlist;
  }

  async updateWishlist(id: number, body, user: User) {
    const wishlist = await this.getWishlistById(id);
    if (wishlist.owner.id !== user.id) {
      throw new ForbiddenException('Редактирование чужих вишлистов запрещено');
    } else {
      try {
        await this.wishlistRepo.update({ id }, body);
        return this.getWishlistById(id);
      } catch (e) {
        throw new BadRequestException(`Запрос не сработал`);
      }
    }
  }

  async deleteWishlist(id: number) {
    return await this.wishlistRepo.delete({ id })
      .catch(() => {
        throw new NotFoundException(`Ошибка сервера`);
      })
  }
}
