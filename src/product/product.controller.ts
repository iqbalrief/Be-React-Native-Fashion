import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Public } from 'src/auth/common/decorators';
import { ProductCreateDto } from './dto/product-create.dto';
import { ProductService } from './product.service';
import { editFileName, imageFileFilter } from './product.upload';

@Controller('products')
export class ProductController {
  constructor(private productsService: ProductService) {}

  @Public()
  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 5, {
      storage: diskStorage({
        destination: './image',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  create(@UploadedFiles() files, 
  @Body() dto: ProductCreateDto) {
    console.log('files', files);
    return this.productsService.create(dto, files);
  }

  @Public()
  @Get(':id')
  async get(@Param('id') id: number) {
      return this.productsService.getProducts(id);
  }

  @Public()
  @Get()
  getProductsAll(
  ) {
    return this.productsService.getProductsAll();
  }

  @Public()
  @Delete(':id')
  async delete (@Param('id') id: number) {
      return this.productsService.delete(id);
  }

  @Public()
  @Get('image/:path')
  async getImage(
      @Param('path') path,
      @Res() res: any
  ) {
     res.sendFile(path,{root: 'image'}); 
  }
}


