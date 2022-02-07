import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductService } from 'src/product/product.service';
import { User } from 'src/user/Models/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CartCreateDto } from './dto/create-cart.dto';
import { CartUpdateDto } from './dto/update-cart.dto';
import { Cart } from './entity/cart.entity';

@Injectable()
export class CartService {
    constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    private readonly userService: UserService,
    private readonly productService: ProductService

    ){}

    async createCart(id, dto:CartCreateDto) {
        let cart = new Cart()
        const user = await this.userService.findById(id)
        const product = await this.productService.getProducts(dto.productId)
        cart.image = product.image[0].filename
        cart.user = user
        cart.product = product
        cart.quantity = dto.quantity
        cart.size = dto.size
        return await this.cartRepository.save(cart)
    }

    async updateCart(id, dto:CartUpdateDto) {    
        let {...currentcart} = await this.cartRepository.findOne(id)
        return await this.cartRepository.save({...currentcart, ...dto})
    }

    async getProductsAll() { 
        return await this.cartRepository.find();
      }
    
} 
