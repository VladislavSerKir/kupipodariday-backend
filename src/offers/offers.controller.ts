import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) { }

  @Post()
  createProfileOffer(@Body() body: CreateOfferDto) {
    return this.offersService.createOffer(body);
  }

  @Get()
  getOffersInfo() {
    return this.offersService.getOffers();
  }

  @Get('/:id')
  getOffersByIdInfo(@Param('id') id: string) {
    return this.offersService.getOffersById(parseInt(id));
  }
}
