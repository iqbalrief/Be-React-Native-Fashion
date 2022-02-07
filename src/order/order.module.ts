import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/cart/entity/cart.entity';
import { User } from 'src/user/Models/user.entity';
import { UserService } from 'src/user/user.service';
import { Order } from './entity/order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, Order, User])
  ],
  controllers: [OrderController],
  providers: [OrderService, UserService]
})
export class OrderModule {}
