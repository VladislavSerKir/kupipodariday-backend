import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist) private wishlistRepo: Repository<Wishlist>,
  ) { }

  getWishlists() {
    return `/wishlists  GET`;
  }

  async createWishlist(body: Partial<Wishlist>) {
    return `/wishlists  ${body}  POST`;
  }

  getWishlistById(id: number) {
    return `/wishlists/${id}  GET`;
  }

  async updateWishlist(id: number, body: Partial<Wishlist>) {
    return `/wishlists/${id}   ${body}   PATCH`;
  }

  async deleteWishlist(id: number) {
    return `/wishlists/${id}   DELETE`;
  }
}
