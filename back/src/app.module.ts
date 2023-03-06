import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule, ConfigService} from '@nestjs/config';
import UserModule from './user/user.module';
import StatusController from './status.controller';
import {commonConfig, developmentConfig, testConfig} from './typeorm.config';
import ProductsModule from './products/products.module';
import PurchasesModule from './purchases/purchases.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const env = configService.get('NODE_ENV');
        switch (env) {
          case 'test':
            return testConfig;
          case 'local':
            return developmentConfig;
          default:
            return commonConfig;
        }
      },
      inject: [ConfigService],
    }),
    UserModule,
    ProductsModule,
    PurchasesModule,
  ],
  controllers: [StatusController],
})
export default class AppModule {}
