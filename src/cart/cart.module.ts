import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entity/cart.entity';
import { User } from 'src/user/Models/user.entity';
import { UserService } from 'src/user/user.service';
import { ProductService } from 'src/product/product.service';
import { Product } from 'src/product/entity/product.entity';
import { Productsize } from 'src/product/entity/product.size.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, User, Product, Productsize])
  ],
  providers: [CartService, UserService, ProductService],
  controllers: [CartController]
})
export class CartModule {}
