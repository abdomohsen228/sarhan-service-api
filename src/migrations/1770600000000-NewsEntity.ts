import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewsEntity1770600000000 implements MigrationInterface {
  name = 'NewsEntity1770600000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "news" (
        "id" SERIAL NOT NULL,
        "title" character varying(255) NOT NULL,
        "shortArticle" text NOT NULL,
        "image" character varying(500),
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_news_id" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      INSERT INTO "news" ("title", "shortArticle", "image")
      VALUES
      (
        'Smart Irrigation Boosts Yields in Arid Regions',
        'Farmers across MENA are adopting sensor-based irrigation systems to reduce water consumption by up to 30% while maintaining premium export quality.',
        'https://via.placeholder.com/800x500?text=Smart+Irrigation'
      ),
      (
        'Global Demand Rises for Traceable Fresh Produce',
        'Export partners increasingly require end-to-end traceability, pushing producers to implement digital tracking from farm to port.',
        'https://via.placeholder.com/800x500?text=Traceable+Produce'
      ),
      (
        'Cold Chain Innovation Extends Shelf Life of Fruits',
        'New cold chain standards are helping exporters maintain freshness and reduce waste during long-distance shipping.',
        'https://via.placeholder.com/800x500?text=Cold+Chain+Innovation'
      ),
      (
        'Sustainable Packaging Gains Momentum in Agriculture',
        'Producers are shifting from traditional packaging towards eco-friendly materials that meet both retailer and regulatory expectations.',
        'https://via.placeholder.com/800x500?text=Sustainable+Packaging'
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "news"`);
  }
}

