import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //para reconhecer DTO method
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));
  await app.listen(8080);
}
bootstrap();
