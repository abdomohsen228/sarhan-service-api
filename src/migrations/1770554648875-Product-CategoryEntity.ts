import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductCategoryEntity1770554648875 implements MigrationInterface {
  name = 'ProductCategoryEntity1770554648875';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."products_origin_enum" AS ENUM('EGYPT', 'TURKEY', 'MOROCCO', 'SPAIN')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."products_growingmethod_enum" AS ENUM('ORGANIC', 'CONVENTIONAL', 'GREENHOUSE')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."products_storage_enum" AS ENUM('AMBIENT', 'REFRIGERATED', 'FROZEN')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."products_shelflife_enum" AS ENUM('SHORT', 'MEDIUM', 'LONG')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."products_harvesttime_enum" AS ENUM('EARLY_SEASON', 'MID_SEASON', 'LATE_SEASON')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."products_healthbenefits_enum" AS ENUM('IMMUNITY', 'DIGESTION', 'HEART_HEALTH', 'WEIGHT_LOSS')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."products_calorieslevel_enum" AS ENUM('LOW', 'MEDIUM', 'HIGH')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."products_vitamins_enum" AS ENUM('VITAMIN_A', 'VITAMIN_B', 'VITAMIN_C', 'VITAMIN_D', 'VITAMIN_E')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."products_packingoptions_enum" AS ENUM('TELESCOPIC_CARTON', 'PLASTIC_BOX', 'WOODEN_CRATE', 'BULK')`,
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" text, "origin" "public"."products_origin_enum" NOT NULL, "growingMethod" "public"."products_growingmethod_enum" NOT NULL, "storage" "public"."products_storage_enum" NOT NULL, "shelfLife" "public"."products_shelflife_enum" NOT NULL, "harvestTime" "public"."products_harvesttime_enum" NOT NULL, "healthBenefits" "public"."products_healthbenefits_enum" array NOT NULL, "caloriesLevel" "public"."products_calorieslevel_enum" NOT NULL, "vitamins" "public"."products_vitamins_enum" array NOT NULL, "packingOptions" "public"."products_packingoptions_enum" array NOT NULL, "image_urls" text array NOT NULL, "categoryId" integer, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"`,
    );
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(
      `DROP TYPE "public"."products_packingoptions_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."products_vitamins_enum"`);
    await queryRunner.query(`DROP TYPE "public"."products_calorieslevel_enum"`);
    await queryRunner.query(
      `DROP TYPE "public"."products_healthbenefits_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."products_harvesttime_enum"`);
    await queryRunner.query(`DROP TYPE "public"."products_shelflife_enum"`);
    await queryRunner.query(`DROP TYPE "public"."products_storage_enum"`);
    await queryRunner.query(`DROP TYPE "public"."products_growingmethod_enum"`);
    await queryRunner.query(`DROP TYPE "public"."products_origin_enum"`);
    await queryRunner.query(`DROP TABLE "categories"`);
  }
}
