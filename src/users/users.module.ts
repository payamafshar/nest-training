import { Module,MiddlewareConsumer,RequestMethod



} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import  UserEntity  from './user.entity';
import AuthService from './auth.service'
import  AthorizationMiddleware from 'src/Middlewares/Athorization-middleware';
import { JwtAuthMiddleware } from 'src/Middlewares/JWTauth-middleware';

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersService,AuthService,JwtAuthMiddleware]
})
export class UsersModule {

  configure(consumer:MiddlewareConsumer){

    consumer.apply(AthorizationMiddleware).forRoutes('*')

    consumer.apply(JwtAuthMiddleware).forRoutes({path:'/auth/remove/:id',method:RequestMethod.DELETE})
  }
}
