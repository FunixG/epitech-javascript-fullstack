import {NestFactory} from '@nestjs/core';
import {WsAdapter} from '@nestjs/platform-ws';
import AppModule from './app.module';
import * as cors from 'cors';

const APP_PORT: string = process.env.APP_PORT || '8080';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new WsAdapter(app));
  app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: '*',
  }));
  await app.listen(APP_PORT);
}
bootstrap();
