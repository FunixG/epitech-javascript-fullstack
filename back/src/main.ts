import {NestFactory} from '@nestjs/core';
import AppModule from './app.module';

const APP_PORT: string = process.env.APP_PORT || '8080';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(APP_PORT);
}
bootstrap();
