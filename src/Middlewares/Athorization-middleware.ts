

import {NestMiddleware} from '@nestjs/common'
import { NextFunction,Request,Response } from 'express';
import {Injectable} from '@nestjs/common'
import { UsersService } from 'src/users/users.service';
import UserEntity from 'src/users/user.entity';

declare global {
    namespace Express {
        interface Request {
            currentUser : UserEntity
            session:any
        }
    }
}

@Injectable()
export default class AthorizationMiddleware implements NestMiddleware {

    constructor(private userService:UsersService){}
    async use(req: Request, res: Response, next: NextFunction) {
            const { userId} = req.session || {}
            if(userId) {
                const user = await this.userService.findUser(userId)
                req.currentUser = user
                
            }  
          
           return next()
    }
}