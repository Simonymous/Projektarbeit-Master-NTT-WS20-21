import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from './config.json'

/**
 * Main Run Function for Backend
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  config.enableCors ? app.enableCors() : null;
  await app.listen(config.port);
}
bootstrap();
