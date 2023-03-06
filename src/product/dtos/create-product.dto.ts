import { IsNumber, IsString } from "class-validator"


export class CreateProductDto {

    @IsString()
    title:string
    @IsString()
    text:string
    @IsString()
    price:string

    @IsString()
    discount:string

}