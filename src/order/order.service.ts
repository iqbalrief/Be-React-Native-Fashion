import { Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { dematerialize } from 'rxjs';
import { Cart } from 'src/cart/entity/cart.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { OrderCreateDto } from './dto/createOrder.dto';
import { Order } from './entity/order.entity';

@Injectable()
export class OrderService {
    constructor(
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    private readonly userService: UserService,
    
    ){}

    async createOrder(userId, dto: OrderCreateDto){
        let order = new Order()
                const cartId = await this.cartRepository.find
        ({      
                relations:['product', 'user'],
                where:{user: {id: userId}}
            });
        order.shipingfee = dto.shipingfee
        order.totalprice = dto.totalprice
        order.cart = cartId 
        console.log(cartId);
       
        try {
          const result = await this.cartRepository.delete({ user: { id: userId } });
          console.log('result', result)
        } catch (error) {
          console.log("error", error)
        }
        return await this.orderRepository.save(order)
      }
        
    }

