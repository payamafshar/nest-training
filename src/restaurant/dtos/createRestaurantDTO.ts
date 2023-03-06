import { IsString } from "class-validator"



export default class createRestaurantDto {

    @IsString()
    name:string
    @IsString()

    open_time:string
    @IsString()

    close_time:string
    @IsString()

    slug:string
    

}