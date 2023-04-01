import { Controller, Post } from '@nestjs/common';
import {
  Body,
  Param,
  Get,
  Patch,
  Delete,
  Session,
  Res,
  Req,
} from '@nestjs/common/decorators';
import SerilizeInterceptor from 'src/interceptors/serilizing-interceptor';
import UpdateUserDto from './dtos/update.user';
import { UsersService } from './users.service';
import { UserIntercept } from './dtos/user.intercepting.dto';
import { UseInterceptors, UseGuards } from '@nestjs/common';
import AuthService from './auth.service';
import CreateOtpDtop from './dtos/otpDto';
import CheckOtpDto from './dtos/checkOtp.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class UsersController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('/getotp')
  async getOtp(@Body() body: CreateOtpDtop) {
    return await this.authService.getOtpfromUser(body);
  }

  @Post('/checkotp')
  async checkOtp(
    @Body() body: CheckOtpDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.authService.checkOtpFromUser(body);
  }

  @Post('/signout')
  signOutUser(@Session() session: any) {
    session.userId = null;
  }
  @Get('/:id')
  @UseInterceptors(new SerilizeInterceptor(UserIntercept))
  async getUserById(@Param('id') id: string) {
    return await this.usersService.findUser(parseInt(id));
  }

  @Patch('/update/:id')
  @UseInterceptors(new SerilizeInterceptor(UserIntercept))
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.updateUserById(parseInt(id), body);
  }

  @Delete('/remove/:id')
  async removeUser(@Param('id') id: string) {
    return await this.usersService.removeUserById(parseInt(id));
  }
}
