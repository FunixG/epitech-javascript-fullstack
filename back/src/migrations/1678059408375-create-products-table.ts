import {MigrationInterface, QueryRunner} from 'typeorm';
import {Logger} from '@nestjs/common';

export default class CreateProductsTable1678059408375 implements MigrationInterface {
  private readonly logger = new Logger(CreateProductsTable1678059408375.name);

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('create table products\n'
            + '(\n'
            + '    id           serial constraint "public_unique_key_products" primary key,\n'
            + '    created_at   timestamp        not null,\n'
            + '    updated_at   timestamp,\n'
            + '    name         varchar(100)     not null,\n'
            + '    "urlPicture" varchar(1000)    not null,\n'
            + '    description  varchar(10000)   not null,\n'
            + '    price        double precision not null,\n'
            + '    category     varchar(300)     not null\n'
            + ');');
    this.logger.log('products table created');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products');
    this.logger.log('products table deleted');
  }
}
