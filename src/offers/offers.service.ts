import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OffersService {
  constructor(@InjectRepository(Offer) private offerRepo: Repository<Offer>) { }

  async createOffer(body: Partial<Offer>) {
    return `/offers   ${body}`;
  }

  async getOffers(): Promise<Offer[]> {
    return this.offerRepo.find();
  }

  async getOffersById(id: number): Promise<Offer> {
    const offer = await this.offerRepo.findOne({ where: { id: id } });
    if (!offer) {
      throw new NotFoundException(`There are no offer with id: ${id}`);
    }
    return offer;
  }
}
