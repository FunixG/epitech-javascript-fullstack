import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import PurchasesService from './services/purchases.service';
import PurchasesController from './controllers/purchases.controller';
import Purchase from './entities/purchase.entity';
import UserModule from '../user/user.module';
import ProductsModule from '../products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Purchase]),
    UserModule,
    ProductsModule,
  ],
  providers: [
    PurchasesService,
  ],
  controllers: [
    PurchasesController,
  ],
})
export default class PurchasesModule {}
