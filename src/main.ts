import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: '*', credentials: true });
  app.use(cookieParser('asdasd'));
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: false,
    }),
  );

  await app.listen(3000);
}
bootstrap();
