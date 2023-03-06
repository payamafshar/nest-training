import { Controller,UseGuards,UseInterceptors,Param, Req, Get } from '@nestjs/common';
import {ReportsService} from './reports.service'
import {Post ,Body} from '@nestjs/common'
import { CreateReportDto } from './dtos/create-report.dto';
import { AdminGuard } from './guard/admin';
import CurrentUserInterceptor from 'src/users/interceptors/currnet-user.interceptor';
import  ApproveCreateRequestDto  from './dtos/approveCreate.dto';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import UserEntity from 'src/users/user.entity';
import { Request } from 'express';
import SerilizeInterceptor from 'src/interceptors/serilizing-interceptor';
import { ReportDto } from './dtos/Report.dto';
@Controller('reports')

export class ReportsController {

    constructor(private reportsService:ReportsService){}

    @Post('/create')
    @UseInterceptors(new SerilizeInterceptor(ReportDto))
     async createReportCar(@Body() body:CreateReportDto,@Req() request:Request){

        const user = request.currentUser
        return await this.reportsService.createReport(body,user)
    }

    @Post('/approved/:id')
    
    @UseGuards(AdminGuard)

    async approveRequest(@Body() body:ApproveCreateRequestDto, @Param('id') id:string ){

        return await this.reportsService.approveRequest(body,parseInt(id))
    }

    @Get('/all')

    getAllReports(){
       return this.reportsService.getReportsWithLefAndJoin()
    }
}
