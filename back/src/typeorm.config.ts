import {TypeOrmModuleOptions} from '@nestjs/typeorm';

const commonConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'mysql',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'js_fullstack_docker',
  entities: ['src/**/**.entity{.ts,.js}'],
  synchronize: true,
};

const developmentConfig: TypeOrmModuleOptions = {
  ...commonConfig,
  database: 'js_fullstack',
};

const testConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: ':memory:',
  synchronize: true,
  logging: false,
  entities: ['src/**/**.entity{.ts,.js}'],
};

export { commonConfig, developmentConfig, testConfig };
