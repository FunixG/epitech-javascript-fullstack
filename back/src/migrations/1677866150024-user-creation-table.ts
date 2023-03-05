import {MigrationInterface, QueryRunner} from 'typeorm';
import {Logger} from '@nestjs/common';

export default class UserCreationTable1677866150024 implements MigrationInterface {
  private readonly logger = new Logger(UserCreationTable1677866150024.name);

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('create table users\n'
            + '(\n'
            + '    id         serial constraint "unique_id_key_users" primary key,\n'
            + '    created_at timestamp            not null,\n'
            + '    updated_at timestamp            not null,\n'
            + '    username   varchar(255)         not null,\n'
            + '    password   varchar(500)         not null,\n'
            + '    email      varchar(50)          not null,\n'
            + '    address    varchar(250)         not null,\n'
            + '    role       varchar(100)         not null,\n'
            + '    is_active  boolean default true not null\n'
            + ');');
    this.logger.log('users table created');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
    this.logger.log('users table removed.');
  }
}
