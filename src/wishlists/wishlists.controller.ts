import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';

@Controller('wishlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) { }

  @Get()
  getWishlistsInfo() {
    return this.wishlistsService.getWishlists();
  }

  @Post()
  createProfileWishlist(@Body() body: CreateWishlistDto) {
    return this.wishlistsService.createWishlist(body);
  }

  @Get(':id')
  getWishlistInfoById(@Param('id') id: number) {
    return this.wishlistsService.getWishlistById(id);
  }

  @Patch(':id')
  updateWishlistById(@Param('id') id: number, @Body() body: UpdateWishlistDto) {
    return this.wishlistsService.updateWishlist(id, body);
  }

  @Delete(':id')
  deleteWishlistById(@Param('id') id: number) {
    return this.wishlistsService.deleteWishlist(id);
  }
}
