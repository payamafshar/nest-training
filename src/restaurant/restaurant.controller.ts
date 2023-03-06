import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import createRestaurantDto from './dtos/createRestaurantDTO';
import { CreateTableDto } from './dtos/createTableDto';
import { RestaurantService } from './restaurant.service';

@Controller('restaurant')
export class RestaurantController {

    constructor( private resaurantService:RestaurantService ){}

    @Post('/create')

    createRestaurant( @Body() createRestaurantDto:createRestaurantDto ) {


        return this.resaurantService.createRestaurant(createRestaurantDto)
    }


    @Post('/table/create/:id')

    createTable(@Param('id',ParseIntPipe) restaurantId:number , @Body() createTableDto:CreateTableDto ) {


        return this.resaurantService.createTable(restaurantId,createTableDto)
    }


    @Get('/availible')

    checkAvailiblity(@Query() query:{slug:string,name:string,day:string,time:string,partySize:string}){


        return this.resaurantService.checkAvailbility(query)
    }
}
