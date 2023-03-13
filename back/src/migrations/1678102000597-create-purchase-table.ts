import { MigrationInterface, QueryRunner } from 'typeorm';
import { Logger } from '@nestjs/common';

export default class CreatePurchaseTable1678102000597 implements MigrationInterface {
  private readonly logger = new Logger(CreatePurchaseTable1678102000597.name);

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('create table purchases\n'
        + '(\n'
        + '    id          serial\n'
        + '        constraint "public_id_purchases"\n'
        + '            primary key,\n'
        + '    created_at  timestamp not null,\n'
        + '    updated_at  timestamp,\n'
        + '    "userId"    integer   not null\n'
        + '        constraint "purchases_link_user"\n'
        + '            references users,\n'
        + '    "productId" integer   not null\n'
        + '        constraint "purchase_link_product"\n'
        + '            references products\n'
        + ');\n');
    this.logger.log('create purchases table');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('purchases');
    this.logger.log('remove purchases table');
  }
}
