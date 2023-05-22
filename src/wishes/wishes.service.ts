import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WishesService {
  constructor(@InjectRepository(Wish) private wishRepo: Repository<Wish>) { }

  async createWish(body: Partial<Wish>) {
    return `/wishes   ${body}`
  }

  async getLastWish() {
    return '/wishes/last';
  }

  async getTopWish() {
    return '/wishes/top';
  }

  async getWishById(id: number) {
    return `/wishes/${id}  GET`;
  }

  async updateWish(id: number, body: Partial<Wish>) {
    return `/wishes/${id}    ${body}`;
  }

  async deleteWish(id: number) {
    return `/wishes/${id}  DELETE`;
  }

  async copyWish(id: number) {
    return `/wishes/${id}  COPY`;
  }
}
