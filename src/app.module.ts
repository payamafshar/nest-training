import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CategoryModule } from './category/category.module';
import * as cookieParser from 'cookie-parser';
import { ProductModule } from './product/product.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RestaurantModule } from './restaurant/restaurant.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    UsersModule,
    ReportsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'postgres',
      username: 'postgres',
      database: 'mycv',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CategoryModule,
    ProductModule,
    RestaurantModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
