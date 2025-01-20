import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv'; // Import dotenv

dotenv.config({ path: '.env.dev' }); // Chỉ định file .env.dev

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT_LOCAL ?? 3000);
}
bootstrap();
