import { Body, Controller, Post } from '@nestjs/common';
import { GetCurrentUserId } from 'src/auth/common/decorators';
import { CartCreateDto } from 'src/cart/dto/create-cart.dto';
import { OrderCreateDto } from './dto/createOrder.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService) {}


    @Post()
    createCart(
      @GetCurrentUserId()
      userId: number,
      @Body() dto: OrderCreateDto,
    ) {
      return this.orderService.createOrder(userId, dto);
    }
    
}
