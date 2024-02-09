import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { whitelist } from 'validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    }
  ))

  const config = new DocumentBuilder()
    .setTitle('Teste técnico Dev Backend Jr. nScreen - CRUD de reservas')
    .setDescription(
      'API desenvolvida com o intuito de solucionar o desafio técnico proposto para a vaga de desenvolvedor backend Jr. na nScreen.',
    )
    .setVersion('1.0')
    .addTag('bookings')
    .addTag('persons')
    .addTag('rooms')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
