import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express/multer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';
import { join } from 'path';
import { diskStorage } from 'multer';
import { CategoryEntity } from 'src/category/category.entity';
import { BasketEntity } from './basket.entity';
import { JwtAuthMiddleware } from 'src/Middlewares/JWTauth-middleware';
import { UsersService } from 'src/users/users.service';
import UserEntity from 'src/users/user.entity';
import { OrderEntity } from './order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      CategoryEntity,
      BasketEntity,
      UserEntity,
      OrderEntity,
    ]),
    MulterModule.register({
      dest: './uploads',
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, `${file.originalname}`);
        },
      }),
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService, UsersService],
})
export class ProductModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtAuthMiddleware).forRoutes(
      { path: 'product/addToBasket/:productId', method: RequestMethod.POST },
      {
        path: 'product/increaseProduct/basket/:productId',
        method: RequestMethod.POST,
      },
      {
        path: 'product/decreaseProduct/basket/:productId',
        method: RequestMethod.POST,
      },
      {
        path: 'product/deleteProductInBasket/delete/:productId',
        method: RequestMethod.POST,
      },
    );
  }
}
