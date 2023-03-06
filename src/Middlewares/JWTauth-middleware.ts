import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NextFunction, Request, Response } from "express";
import UserEntity from "src/users/user.entity";
import { Repository } from "typeorm";
import * as jwt from 'jsonwebtoken'



@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
    constructor(@InjectRepository(UserEntity) private repo:Repository<UserEntity>){}
   async  use(req: Request, res: Response, next: NextFunction) {
        const token = req?.headers?.authorization?.split(' ')?.[1]

        if(token ) {

            const payload =  jwt.verify(token,'dontguesssecret')
            //@ts-ignore
            const {mobile} = payload
            const user = await this.repo.findOne({where:{mobile}})

            if(!user)  next(new UnauthorizedException('!لطفا وارد حساب کاربری خود شوید'))

            req.currentUser = user
          return  next()

        }
       return next(new UnauthorizedException('لطفا وارد حساب کاربری خود شوید')) 
        
    }
}