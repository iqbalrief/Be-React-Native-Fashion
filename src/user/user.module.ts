import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/cart/entity/cart.entity';
import { User } from './Models/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Cart]),
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
