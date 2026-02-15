import { MigrationInterface, QueryRunner } from 'typeorm';

export class WebsiteSettingEntity1770582695735 implements MigrationInterface {
  name = 'WebsiteSettingEntity1770582695735';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "website_settings" ("id" SERIAL NOT NULL, "slogan" character varying, "phoneNumbers" text array, "emails" text array, "address" text, "facebookUrl" character varying, "instagramUrl" character varying, "twitterUrl" character varying, "linkedinUrl" character varying, "whatsAppLink" character varying, "youtubeUrl" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2fbf46b40c3cb5995d92c73fe68" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`
      INSERT INTO "website_settings" (
        "slogan",
        "phoneNumbers",
        "emails",
        "address",
        "facebookUrl",
        "instagramUrl",
        "twitterUrl",
        "linkedinUrl",
        "whatsAppLink",
        "youtubeUrl"
      )
      VALUES (
        'Connecting the world through premium agriculture. We ensure quality, sustainability, and reliability in every shipment we manage.',
        ARRAY['+971-4-3202677', '+971-54-231-0000'],
        ARRAY['info@sarhan.shop'],
        'Shop No. 34 Municipality Property (Central Commercial Market) Ras Al Khor Dubai, UAE',
        'https://www.facebook.com/sarhan',
        'https://www.instagram.com/sarhan',
        'https://twitter.com/sarhan',
        'https://www.linkedin.com/company/sarhan',
        'https://wa.me/971542310000',
        'https://www.youtube.com/sarhan'
      );    
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "website_settings"`);
  }
}
