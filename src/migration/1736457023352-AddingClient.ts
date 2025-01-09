import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddingClient1736457023352 implements MigrationInterface {
  name = 'AddingClient1736457023352';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "dim_client" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "lastName" character varying NOT NULL, "age" integer NOT NULL, "riskProfile" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_50077a0ac6aacc8f113be8f90cc" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "dim_client"`);
  }
}
