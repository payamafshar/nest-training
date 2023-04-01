import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/create/:englishTitle')
  @UseInterceptors(FileInterceptor('file'))
  createProduct(
    @Body() createProductDto: CreateProductDto,
    @Param('englishTitle') englishTitle: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.productService.create(createProductDto, file, englishTitle);
  }

  @Get('/getAll')
  getAllProducts() {
    return this.productService.getAll();
  }

  @Post('/addToBasket/:productId')
  addToBasket(
    @Param('productId', ParseIntPipe) productId: number,
    @Req() request: Request,
  ) {
    console.log(request.cookies);
    const user = request.currentUser;

    return this.productService.createBasket(productId, user);
  }

  @Post('/increaseProduct/basket/:productId')
  increaseProductInBasket(
    @Req() request: Request,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    const user = request.currentUser;
    return this.productService.increaseProductInBasket(productId, user);
  }
  @Post('/decreaseProduct/basket/:productId')
  decreaseProductInBasket(
    @Req() request: Request,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    const user = request.currentUser;
    return this.productService.decreaseProductInBasket(productId, user);
  }

  @Post('/deleteProductInBasket/delete/:productId')
  deleteProductInBasket(
    @Req() request: Request,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    const user = request.currentUser;

    return this.productService.deleteProductInBasket(productId, user);
  }
}
