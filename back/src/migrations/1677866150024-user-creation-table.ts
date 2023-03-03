import {MigrationInterface, QueryRunner} from "typeorm"

export class userCreationTable1677866150024 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("create table users\n" +
            "(\n" +
            "    id         serial constraint \"unique_id_key_users\" primary key,\n" +
            "    created_at timestamp            not null,\n" +
            "    updated_at timestamp            not null,\n" +
            "    username   varchar(255)         not null,\n" +
            "    password   varchar(500)         not null,\n" +
            "    email      varchar(50)          not null,\n" +
            "    address    varchar(250)         not null,\n" +
            "    is_active  boolean default true not null\n" +
            ");");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
