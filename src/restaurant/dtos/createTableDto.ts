import { IsNumber, IsString } from "class-validator";





export class CreateTableDto {

    @IsNumber()
    seats:number

}