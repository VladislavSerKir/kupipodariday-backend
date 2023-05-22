import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) { }

  @Post()
  postWish(@Body() body: CreateWishDto) {
    return this.wishesService.createWish(body);
  }

  @Get('/last')
  getLastWishInfo() {
    return this.wishesService.getLastWish();
  }

  @Get('/top')
  getTopWishInfo() {
    return this.wishesService.getTopWish();
  }

  @Get(':id')
  getWishByIdInfo(@Param('id') id: number) {
    return this.wishesService.getWishById(id);
  }

  @Patch(':id')
  updateWishById(@Param('id') id: number, body: UpdateWishDto) {
    return this.wishesService.updateWish(id, body)
  }

  @Delete(':id')
  deleteWishById(@Param('id') id: number) {
    return this.wishesService.deleteWish(id);
  }

  @Post(':id/copy')
  copyWishById(@Param('id') id: number) {
    return this.wishesService.copyWish(id);
  }
}
