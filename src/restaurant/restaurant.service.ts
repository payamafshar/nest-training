import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from 'src/category/dtos/createCategoryDto';
import { Repository } from 'typeorm';
import createRestaurantDto from './dtos/createRestaurantDTO';
import { CreateTableDto } from './dtos/createTableDto';
import RestaurantEntity from './restuarant.entity';
import {times} from './data/time'
import TableEntity from './tabel.entity';
import BookingEntity from './booking.entity';
import { CreateReservDto } from './dtos/createReservDto';

@Injectable()
export class RestaurantService {


    constructor(
         @InjectRepository(RestaurantEntity) private restaurantRepo:Repository<RestaurantEntity> ,
         @InjectRepository(TableEntity) private tableRepo:Repository<TableEntity>,
         @InjectRepository(BookingEntity) private bookingRepo:Repository<BookingEntity>

    ){}



   async createRestaurant ( createRestaurantDto:createRestaurantDto ) {

        
        const restaurant = this.restaurantRepo.create(createRestaurantDto)

        const table = await this.tableRepo.find({where:{restaurantId:restaurant.id}})

        restaurant.tables = table

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

        const restaurant = await this.restaurantRepo.findOne({where:{slug},relations:['tables']})

       

        const findedSearchTimesWithTime = times.find(t => (t.time).toString() == time).searchTimes


       const availibleTimes =  findedSearchTimesWithTime.filter( searchTime => {

            if( new Date(`${day}T${searchTime}`)  <= new Date(`${day}T${restaurant.open_time}`)  || new Date(`${day}T${searchTime}`)  >= new Date(`${day}T${restaurant.close_time}`) )  return false
            
            return true
        } )

        const allRestaurantSeats = restaurant.tables.reduce((total:number,item:TableEntity):number => {

            return total + item.seats
        },0)

        const bookings = await this.bookingRepo.find({where:{restaurantId:restaurant.id},relations:['tables']})


        const findedArray = []
         availibleTimes.forEach( item =>  {

          const findedBookAtSpeceficAvailbleTimes = bookings.find( book => book.booking_time == item ) 

         

            const reservedSeats =  findedBookAtSpeceficAvailbleTimes?.tables?.reduce((total:number,table:TableEntity):number=> {

                return total+table.seats
            },0) || 0
      
            let availebility:boolean

            if(allRestaurantSeats - reservedSeats >= +partySize) {
                availebility = true
            }else {
                availebility = false
            }

            findedArray.push({ 
                time:item ,
                reservedSeats ,
                findedBookAtSpeceficAvailbleTimes,
                availebility
            })
       

        } )


        return findedArray
    }


    async makeReservation( createReservDto:CreateReservDto , query:{day:string} ) {

        const {day} = query

        const { restaurantId , number_of_people , booking_time } = createReservDto


        const restaurant = await this.restaurantRepo.findOne({where:{id:restaurantId}})

        const restaurantTables = await this.tableRepo.find({where:{restaurantId:restaurant.id}})


        const findedSearchTimesWithTime = times.find(t => (t.time).toString() == booking_time).searchTimes


       const availibleTimes =  findedSearchTimesWithTime.filter( searchTime => {

            if( new Date(`${day}T${searchTime}`)  <= new Date(`${day}T${restaurant.open_time}`)   || new Date(`${day}T${searchTime}`)  >= new Date(`${day}T${restaurant.close_time}`))   return false
            
            return true
        } )

        const tablesCount = {
            2:[],
            4:[]
        }


        restaurantTables.forEach( table => {
            if(table.seats == 2) tablesCount[2].push(table)

            if(table.seats == 4) tablesCount[4].push(table)
        } )


     
        const bookedTables = []

        let seatsRemaining = number_of_people


        while(seatsRemaining > 0) {

            if(seatsRemaining >=3) {

                if(tablesCount[4].length) {
                    bookedTables.push(tablesCount[4][0])
                    tablesCount[4].shift()
                   seatsRemaining = seatsRemaining  - 4 

           }else {
                    
                        bookedTables.push(tablesCount[2][0])
                        tablesCount[2].shift()
                       seatsRemaining = seatsRemaining  - 2 

        } 
    }else {

        if(tablesCount[2].length) {
            bookedTables.push(tablesCount[2][0])
            tablesCount[2].shift()
           seatsRemaining = seatsRemaining  - 2 

        }else {
            
                bookedTables.push(tablesCount[4][0])
                tablesCount[4].shift()
               seatsRemaining = seatsRemaining  - 4 

} 
    }
}


        const booking =  this.bookingRepo.create(createReservDto)

        booking.tables = bookedTables
       
        return this.bookingRepo.save(booking)

    }

}
