import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import User from './user/entities/user.entity';
import Product from './products/entities/product.entity';
import Purchase from './purchases/entities/purchase.entity';

const commonConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'database',
  port: 5432,
  username: 'root',
  password: 'root',
  database: 'js_fullstack_docker',
  entities: [User, Product, Purchase],
  migrations: ['./migrations/*.ts'],
  synchronize: false,
};

const developmentConfig: TypeOrmModuleOptions = {
  ...commonConfig,
  host: '127.0.0.1',
  database: 'js_fullstack',
  synchronize: true,
  logging: true,
};

const testConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: ':memory:',
  synchronize: true,
  logging: false,
  entities: [User, Product, Purchase],
};

export { commonConfig, developmentConfig, testConfig };
