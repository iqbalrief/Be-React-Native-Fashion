import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserInterfaceIdiom } from 'expo-constants';
import {
  GetCurrentUser,
  GetCurrentUserId,
  Public,
} from 'src/auth/common/decorators';

import { CartService } from './cart.service';
import { CartCreateDto } from './dto/create-cart.dto';
import { CartUpdateDto } from './dto/update-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Post()
  createCart(
    @GetCurrentUserId()
    userId: number,
    @Body() dto: CartCreateDto,
  ) {
    return this.cartService.createCart(userId, dto);
  }

  @Put(':id')
  updateCart(@Param('id')cartId: number, @Body() dto: CartUpdateDto) {
    return this.cartService.updateCart(cartId, dto);
  }

  @Get("all")
  getCartAll(
    @GetCurrentUserId()
    userId: number,
  ) {
    return this.cartService.getProductsAll(userId);
  }
}
