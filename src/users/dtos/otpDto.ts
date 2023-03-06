import { IsIn, IsInt, IsNumber, isNumber, isNumberString, IS_NUMBER } from "class-validator";



export default class CreateOtpDtop {
    @IsInt()
    mobile:number
}

