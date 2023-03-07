import {NestFactory} from '@nestjs/core';
import AppModule from './app.module';
import {WsAdapter} from '@nestjs/platform-ws';

const APP_PORT: string = process.env.APP_PORT || '8080';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new WsAdapter(app));
  await app.listen(APP_PORT);
}
bootstrap();
