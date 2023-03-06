// model Restaurant {
//     id          Int       @id @default(autoincrement())
//     name        String
//     main_image  String
//     images      String[]
//     description String
//     open_time   String
//     close_time  String
//     slug        String    @unique
//     price       PRICE
//     items       Item[]
//     location_id Int
//     location    Location  @relation(fields: [location_id], references: [id])
//     cuisine_id  Int
//     cuisine     Cuisine   @relation(fields: [cuisine_id], references: [id])
//     reviews     Review[]
//     bookings    Booking[]
//     tables      Table[]
//     created_at  DateTime  @default(now())
//     updated_at  DateTime  @updatedAt
// }

import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import BookingEntity from "./booking.entity";
import TableEntity from "./tabel.entity";

@Entity()
export default class RestaurantEntity {

    @PrimaryGeneratedColumn()
    id:number
    @Column()
    name:string
    @Column()
    open_time:string
    @Column()
    close_time:string
    @Column()
    slug:string

    @OneToMany( () => BookingEntity , booking => booking.restaurant )
    bookings:BookingEntity[]

    @OneToMany( () => TableEntity , table => table.restaurant )
    tables:TableEntity[]

}