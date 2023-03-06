import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import CurrentUserInterceptor from './users/interceptors/currnet-user.interceptor';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RestaurantModule } from './restaurant/restaurant.module';

@Module({
  imports: [UsersModule, ReportsModule,TypeOrmModule.forRoot({
    type:'postgres',
    host:'localhost',
    port:5432,
    password:'postgres',
    username:'postgres',
    database:'mycv',
    autoLoadEntities:true,
    synchronize:true,
  }), CategoryModule, ProductModule, RestaurantModule],
  controllers: [AppController],
  providers: [AppService ],
})
export class AppModule {}
