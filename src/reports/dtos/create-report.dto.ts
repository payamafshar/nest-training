
import {IsString,IsNumber} from 'class-validator'
import {Expose} from 'class-transformer'
import UserEntity from 'src/users/user.entity'
import { Transform} from 'class-transformer'

export class CreateReportDto  {
    @IsNumber()
price:number
@IsNumber()
mileage:number

@IsString()
model:string
@IsNumber()
make:number

user:UserEntity

}