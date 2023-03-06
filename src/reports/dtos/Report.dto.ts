
import {IsString,IsNumber} from 'class-validator'
import {Expose} from 'class-transformer'
import UserEntity from 'src/users/user.entity'
import { Transform} from 'class-transformer'


export class ReportDto  {
    @Expose()
price:number
@Expose()
mileage:number
@Expose()
model:string
@Expose()
make:number
@Transform(({obj})=> {
   return obj.user.id
})
@Expose()
userId:UserEntity

}