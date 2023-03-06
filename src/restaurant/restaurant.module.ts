import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import BookingEntity from './booking.entity';
import TableEntity from './tabel.entity';
import RestaurantEntity from './restuarant.entity';

@Module({
  imports:[TypeOrmModule.forFeature([BookingEntity,TableEntity,RestaurantEntity])],
  providers: [RestaurantService],
  controllers: [RestaurantController]
})
export class RestaurantModule {}
