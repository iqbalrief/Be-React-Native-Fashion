import { Get, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCreateDto } from './dto/product-create.dto';
import { Product } from './entity/product.entity';
import { Productsize } from './entity/product.size.entity';

@Injectable()
export class ProductService {
    constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    @InjectRepository(Productsize) private readonly productSizeRepository: Repository<Productsize>
)   {}
      
    async create(dto: ProductCreateDto, files: any) {
    console.log(files)
    let produk = new Product()
    produk.description = dto.description
    produk.title = dto.title
    produk.price = dto.price
    produk.size = await Promise.all(dto.size.map(size => {
      return this.productSizeRepository.findOne({ where: { name: size } })
  }))
    const img = files.map((file: any) => {
        return {filename: file.filename}
    })
    produk.image = img
    console.log(produk);
    return await this.productRepository.save(produk);
  }

  async getProducts(id: number): Promise<Product> {
      return await this.productRepository.findOne(id, {relations: ['image']});
    }

    async getProductsAll() { 
        return await this.productRepository.find({relations: ['image']});
      }

      async delete(id: number) {
        return await this.productRepository.delete(id);
      }
  
}
