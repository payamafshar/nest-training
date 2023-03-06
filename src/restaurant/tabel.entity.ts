// model Table {
//     id            Int                @id @default(autoincrement())
//     seats         Int
//     restaurant_id Int
//     restaurant    Restaurant         @relation(fields: [restaurant_id], references: [id])
//     bookings      BookingsOnTables[]
//     created_at    DateTime           @default(now())
//     updated_at    DateTime           @updatedAt
//   }

import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import BookingEntity from "./booking.entity";
import RestaurantEntity from "./restuarant.entity";

@Entity()
export default class TableEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    seats:number

    @Column()
    restaurantId:number

    @ManyToOne( () => RestaurantEntity , restaurant => restaurant.tables )
    restaurant:RestaurantEntity

  

}