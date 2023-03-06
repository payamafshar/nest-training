import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from 'src/category/dtos/createCategoryDto';
import { Repository } from 'typeorm';
import createRestaurantDto from './dtos/createRestaurantDTO';
import { CreateTableDto } from './dtos/createTableDto';
import RestaurantEntity from './restuarant.entity';
import {times} from './data/time'
import TableEntity from './tabel.entity';
import BookingEntity from './booking.entity';

@Injectable()
export class RestaurantService {


    constructor(
         @InjectRepository(RestaurantEntity) private restaurantRepo:Repository<RestaurantEntity> ,
         @InjectRepository(TableEntity) private tableRepo:Repository<TableEntity>,
         @InjectRepository(BookingEntity) private bookingRepo:Repository<BookingEntity>

    ){}



    createRestaurant ( createRestaurantDto:createRestaurantDto ) {

        
        const restaurant = this.restaurantRepo.create(createRestaurantDto)


        return this.restaurantRepo.save(restaurant)

    }

   async createTable(restauratntId:number,createTable:CreateTableDto){


        const restaurant = await this.restaurantRepo.findOne({where:{
            id:restauratntId
        }})
        const table = this.tableRepo.create(createTable)
        table.restaurantId = restauratntId

        table.restaurant = restaurant

        return this.tableRepo.save(table)
    }


    async checkAvailbility(query:{slug:string,name:string,time:string,day:string,partySize:string}){


        const {slug,name,time,day,partySize} = query

        const restaurant = await this.restaurantRepo.findOne({where:{slug}})

        const findedSearchTimesWithTime = times.find(t => (t.time).toString() == time).searchTimes


       const availibleTimes =  findedSearchTimesWithTime.filter( searchTime => {

            if( searchTime <= restaurant.open_time || searchTime >= restaurant.close_time )  return false
            
            return true
        } )


        const bookings = await this.bookingRepo.find({where:{restaurantId:restaurant.id},relations:['tables']})



        const findBookingAtSpeceficTime =  bookings.find( book => (book.booking_time) == time )

        console.log(findBookingAtSpeceficTime)

        const restaurantTable = await this.tableRepo.find({where:{restaurantId:restaurant.id}})


        const availibleTables = restaurantTable.filter(item => {

            
            for (const table of findBookingAtSpeceficTime.tables) {
                
                console.log(table)
                return  item.id != table.id
            }

        })




     



    
 
        return {availibleTimes,availibleTables}
    }

}
