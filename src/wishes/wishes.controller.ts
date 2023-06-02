import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { JwtGuard } from 'src/auth/JwtGuard';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) { }

  @UseGuards(JwtGuard)
  @Post()
  postWish(@Req() req, @Body() body: CreateWishDto) {
    console.log(body, req.user)
    return this.wishesService.createWish(body, req.user);
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
    return this.wishesService.updateWish(id, body);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  deleteWishById(@Param('id') id: number) {
    return this.wishesService.deleteWish(id);
  }

  @Post(':id/copy')
  copyWishById(@Param('id') id: number) {
    return this.wishesService.copyWish(id);
  }
}
