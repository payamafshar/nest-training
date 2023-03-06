import { IsEmail } from "class-validator"
import { IsString } from "class-validator"
import { IsOptional } from "class-validator"


class CreateUserDto {
    

    @IsEmail()
    @IsString()
    email:string

    @IsString()
    password:string

    
}
export default CreateUserDto






