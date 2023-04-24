import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { description, name, version } from 'package.json';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config = new DocumentBuilder()
    .setTitle(name)
    .setDescription(description)
    .setVersion(version)
    .addSecurity('User Credentials', { type: 'http', scheme: 'basic' })
    .addSecurity('Access Token', { type: 'http', scheme: 'bearer' })
    .addSecurity('Refresh Token', { type: 'http', scheme: 'bearer' })
    .build();

  SwaggerModule.setup('/docs', app, SwaggerModule.createDocument(app, config));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      transform: true,
    }),
  );

  await app.listen(80);
}

bootstrap();
