import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ProductsService from './services/products.service';
import ProductsController from './controllers/products.controller';
import Product from './entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
  ],
  providers: [
    ProductsService,
  ],
  controllers: [
    ProductsController,
  ],
  exports: [
    ProductsService,
  ],
})
export default class ProductsModule {}
