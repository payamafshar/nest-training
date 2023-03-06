// model Booking {
//     id                Int                @id @default(autoincrement())
//     number_of_people  Int
//     booking_time      DateTime
//     booker_email      String
//     booker_phone      String
//     booker_first_name String
//     booker_last_name  String
//     booker_occasion   String?
//     booker_request    String?
//     restaurant_id     Int
//     restaurant        Restaurant         @relation(fields: [restaurant_id], references: [id])
//     tables            BookingsOnTables[]
//     created_at        DateTime           @default(now())
//     updated_at        DateTime           @updatedAt
//   }

import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import RestaurantEntity from "./restuarant.entity"
import TableEntity from "./tabel.entity"


@Entity()
export default class BookingEntity {

    @PrimaryGeneratedColumn()
    id   : number   

    @Column()
    number_of_people : number
    @Column()

    booking_time   :   string
    @Column()

    booker_email    :  String
    @Column()

    
    restaurantId :number

    @Column()
    booker_phone     : String
    @Column()

    booker_first_name :String
    @Column()

    booker_last_name : String

   


    @ManyToOne( () => RestaurantEntity , restaurant => restaurant.bookings )
    restaurant:RestaurantEntity

    @ManyToMany( () => TableEntity )
    @JoinTable({name:'table_id'})
    tables:TableEntity[]
}




