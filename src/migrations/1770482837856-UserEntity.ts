import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserEntity1770482837856 implements MigrationInterface {
  name = 'UserEntity1770482837856';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "admin" ("id" SERIAL NOT NULL, "username" character varying(50), "email" character varying(100), "password" character varying(255), "token_version" integer NOT NULL DEFAULT '1', "last_login" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_de87485f6489f5d0995f5841952" UNIQUE ("email"), CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`
      INSERT INTO "admin" (
        "username",
        "email",
        "password"
      )
      VALUES (
        'sarhan2026',
        'info@sarhan.shop',
        '$2b$10$xt0EwIvamkgIjizBtMMBZu1a1n5F3VsiWxroelL59u4YWhWAdNdWi' -- sarhan@S2026#
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "admin"`);
  }
}
