import {NestInterceptor,ExecutionContext,CallHandler} from '@nestjs/common'
 import {Observable,map} from 'rxjs'
 import {plainToClass} from 'class-transformer'

export default class SerilizeInterceptor implements NestInterceptor {

    constructor(private UserDto:any){}
    intercept(context:ExecutionContext,next:CallHandler):Observable<any>{

        
        // Evrything about request
        return next.handle().pipe( map((data:any)=>{
                // evrything about response
                return plainToClass(this.UserDto,data,{excludeExtraneousValues:true})}
            ))
           
        
    }
}