import { Controller, Post } from '@nestjs/common';
import { Body, Param,Get,Patch,Delete,Session } from '@nestjs/common/decorators';
import SerilizeInterceptor from 'src/interceptors/serilizing-interceptor';
import UpdateUserDto from './dtos/update.user';
import  CreateUserDto   from './dtos/user.dtos';
import { UsersService } from './users.service';
import {UserIntercept} from './dtos/user.intercepting.dto';
import { UseInterceptors,UseGuards } from '@nestjs/common';
import AuthService from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthGuard } from './guards/auth.guard';

import UserEntity from './user.entity';
import CurrentUserInterceptor from './interceptors/currnet-user.interceptor';
import CreateOtpDtop from './dtos/otpDto';
import CheckOtpDto from './dtos/checkOtp.dto';
@Controller('auth')
@UseInterceptors(CurrentUserInterceptor)
export class UsersController {

    constructor(
        private authService:AuthService,
        private usersService:UsersService 
        ){

    }

@Post('/signup')

async createUser(@Body() body:CreateUserDto, @Session() session:any ){
    
    const user = await this.authService.signUp(body)
    session.userId = user.id
    return user
}


@Post('/signin') 
async signIn(@Body() body:CreateUserDto,@Session() session:any) {

    
    const user =  await this.authService.signIn(body)
    session.userId = user.id
    return user
}

@Post('/getotp')
async getOtp(@Body() body:CreateOtpDtop ) {

   return await this.authService.getOtpfromUser(body)
}

@Post('/checkotp')

async checkOtp(@Body() body:CheckOtpDto ,@Session() session:any) {

    return await this.authService.checkOtpFromUser(body,session)
}
@Get('/whoiam')
@UseGuards(AuthGuard)
async whoIam(@CurrentUser() user:UserEntity){
    
   
    return user
}

@Post('/signout')

signOutUser(@Session() session:any){
    session.userId = null
}
@Get('/:id')

@UseInterceptors(new SerilizeInterceptor(UserIntercept))
async getUserById(@Param('id') id:string){
 return  await this.usersService.findUser(parseInt(id))
}

@Patch('/update/:id')
@UseInterceptors(new SerilizeInterceptor(UserIntercept))
async updateUser(@Param('id') id:string,@Body() body:UpdateUserDto){

    return this.usersService.updateUserById(parseInt(id),body)

}



@Delete('/remove/:id')
async removeUser(@Param('id') id:string){

    return await this.usersService.removeUserById(parseInt(id))
}
}
