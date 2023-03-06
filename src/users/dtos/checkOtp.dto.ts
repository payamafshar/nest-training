import { Expose } from "class-transformer"
import { IsInt } from "class-validator"



export default class CheckOtpDto {
    // @Expose()
    @IsInt()
    code:number
    // @Expose()
    @IsInt()
    mobile:number
}