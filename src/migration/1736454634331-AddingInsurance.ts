import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddingInsurance1736454634331 implements MigrationInterface {
  name = 'AddingInsurance1736454634331';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "dim_insurance" ("id" SERIAL NOT NULL, "minAge" integer NOT NULL, "maxAge" integer NOT NULL, "percentage" double precision NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_885204f611c4a4406a41fc248be" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `INSERT INTO "dim_insurance" ("minAge", "maxAge", "percentage")
       VALUES
           (19, 30, 3),
           (31, 60, 4),
           (61, 70, 5);`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "dim_insurance"`);
  }
}
