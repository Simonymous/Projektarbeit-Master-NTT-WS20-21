import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const BACKENDPORT = 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(BACKENDPORT);
}
bootstrap();
