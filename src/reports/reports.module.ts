import { Module,MiddlewareConsumer } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import {TypeOrmModule} from '@nestjs/typeorm'

import  ReportsEntity  from './report.entity';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';

@Module({
  imports : [TypeOrmModule.forFeature([ReportsEntity])],
  controllers: [ReportsController],
  providers: [ReportsService ]
})
export class ReportsModule {


}
