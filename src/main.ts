import { PipeTransform, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

function configureGlobalPipes(): PipeTransform[] {
  const validationPipe = new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  });

  return [validationPipe];
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(...configureGlobalPipes());
  await app.listen(3000);
}
bootstrap();
