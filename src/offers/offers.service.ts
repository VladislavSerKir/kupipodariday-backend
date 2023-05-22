import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OffersService {
  constructor(@InjectRepository(Offer) private offerRepo: Repository<Offer>) { }

  async createOffer(body: Partial<Offer>) {
    return `/offers   ${body}`
  }

  async getOffers() {
    return `/offers  GET`
  }

  async getOffersById(id: string) {
    return `/offers/${id}  GET`
  }
}
