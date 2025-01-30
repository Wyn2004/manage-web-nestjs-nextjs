import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

require('dotenv').config({ path: '.env.dev' });
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // cài frefix api và loại trừ
  app.setGlobalPrefix('api/v1', { exclude: [''] });
  // Cai middleware validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  const configService = app.get(ConfigService);
  const port = configService.get('PORT_LOCAL');

  await app.listen(port);
}
bootstrap();
