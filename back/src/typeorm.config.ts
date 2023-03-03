import {TypeOrmModuleOptions} from '@nestjs/typeorm';
import User from "./user/entities/user.entity";

const commonConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'database',
  port: 5432,
  username: 'root',
  password: 'root',
  database: 'js_fullstack_docker',
  entities: [User],
  migrations: ['./migrations/*.ts'],
  synchronize: false
};

const developmentConfig: TypeOrmModuleOptions = {
  ...commonConfig,
  host: '127.0.0.1',
  database: 'js_fullstack',
  synchronize: true,
  logging: true
};

const testConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: ':memory:',
  synchronize: true,
  logging: false,
  entities: ['./**/entities/*.ts'],
};

export { commonConfig, developmentConfig, testConfig };
