
import { IsEmail } from "class-validator"
import { IsString } from "class-validator"
import { IsOptional } from "class-validator"


export default class UpdateUserDto {
    @IsOptional()
    @IsString()
    email:string

    @IsString()
    @IsOptional()
    password:string
}