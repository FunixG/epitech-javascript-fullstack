import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import PurchasesService from './services/purchases.service';
import PurchasesController from './controllers/purchases.controller';
import Purchase from './entities/purchase.entity';
import UserModule from '../user/user.module';
import ProductsModule from '../products/products.module';
import WebsocketModule from '../websocket/websocket.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Purchase]),
    UserModule,
    WebsocketModule,
    ProductsModule,
  ],
  providers: [
    PurchasesService,
  ],
  controllers: [
    PurchasesController,
  ],
  exports: [
    PurchasesService,
  ],
})
export default class PurchasesModule {}
