

import {ExecutionContext,Injectable,CallHandler,NestInterceptor} from '@nestjs/common'
import { UsersService } from '../users.service';


@Injectable()
export default class CurrentUserInterceptor implements NestInterceptor{

    constructor(private usersService:UsersService){}

    async intercept(context:ExecutionContext,next:CallHandler){

        const request = context.switchToHttp().getRequest()
        const id = request.session.userId || undefined

        const user = await this.usersService.findUser(id)
        
        if(user) {

            request.currnetUser = user
        }

  
           
            return next.handle()
     
    }

}