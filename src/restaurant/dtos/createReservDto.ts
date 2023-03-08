import { IsNumber, IsString } from "class-validator"






export class CreateReservDto {

    @IsNumber()
    number_of_people: number

    @IsString()
    booking_time: string
    
    @IsString()
    booker_email: string

    @IsNumber()
    restaurantId: number

    @IsNumber()
    booker_phone: string

    @IsString()
    booker_first_name: string

    @IsString()
    booker_last_name: string


}