import { Injectable,NotFoundException } from '@nestjs/common';
import {Repository} from 'typeorm'
import  { InjectRepository} from '@nestjs/typeorm'
import ReportsEntity from './report.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import  ApproveCreateRequestDto  from './dtos/approveCreate.dto';
import UserEntity from 'src/users/user.entity';

@Injectable()
export class ReportsService {

constructor(@InjectRepository(ReportsEntity) private repo:Repository<ReportsEntity>){}




       async  createReport(createReportDto:CreateReportDto,user:UserEntity){

            const { price , make,mileage ,model} =  createReportDto

            const report = this.repo.create({ price , make,mileage ,model})
            report.user = user
            const createdReport = await this.repo.save(report)
            return createdReport
         
        }

        async approveRequest (approveRequest :ApproveCreateRequestDto,id:number) {

            const {approved} = approveRequest

            const findedRequest = await this.repo.findOne({where:{id}})
            if(!findedRequest) throw new NotFoundException('record didint find')

            findedRequest.approve = approved
            const approveResult = await this.repo.save(findedRequest)
            return approveResult

        }


         getReportsWithLefAndJoin() {


            return this.repo.createQueryBuilder('report')
            .select('*')
            .where('report.model = :model',{model:'lamboo'})
            .leftJoinAndSelect('report.user','user')
            .getRawMany()
        }
}
