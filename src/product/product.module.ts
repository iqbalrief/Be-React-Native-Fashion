import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { Upload } from './entity/product.image.entity';
import { Productsize } from './entity/product.size.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Upload, Productsize])
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
