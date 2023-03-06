import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as express from 'express'
import { join } from 'path';
import { AppModule } from './app.module';
const cookieSession = require('cookie-session')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    name:'session',
    keys:['adsdad']
  }))
  app.use(express.static(join(__dirname,'..','uploads')))
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    forbidUnknownValues:false
    
  })
)
  await app.listen(3000);
}
bootstrap();
