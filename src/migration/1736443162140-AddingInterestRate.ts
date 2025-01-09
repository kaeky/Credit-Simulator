import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddingInterestRate1736443162140 implements MigrationInterface {
  name = 'AddingInterestRate1736443162140';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "dim_interest_rates" ("id" SERIAL NOT NULL, "riskProfile" character varying NOT NULL, "minRange" integer NOT NULL, "maxRange" bigint NOT NULL, "rate" double precision NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2feee308e39e32709132d7362b1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `INSERT INTO "dim_interest_rates" ("riskProfile", "minRange", "maxRange", "rate") VALUES
                                                                                          ('AAA', 0, 6999999, 0.2345),
                                                                                          ('AAA', 7000000, 14999999, 0.201),
                                                                                          ('AAA', 15000000, 49999999, 0.176),
                                                                                          ('AAA', 50000000, 79999999, 0.151),
                                                                                          ('AAA', 80000000, 999999999999, 0.131),

                                                                                          ('AA', 0, 6999999, 0.2495),
                                                                                          ('AA', 7000000, 14999999, 0.24),
                                                                                          ('AA', 15000000, 49999999, 0.213),
                                                                                          ('AA', 50000000, 79999999, 0.185),
                                                                                          ('AA', 80000000, 999999999999, 0.165),

                                                                                          ('A', 0, 6999999, 0.255),
                                                                                          ('A', 7000000, 14999999, 0.253),
                                                                                          ('A', 15000000, 49999999, 0.238),
                                                                                          ('A', 50000000, 79999999, 0.213),
                                                                                          ('A', 80000000, 999999999999, 0.193),

                                                                                          ('BAA', 0, 6999999, 0.261),
                                                                                          ('BAA', 7000000, 14999999, 0.261),
                                                                                          ('BAA', 15000000, 49999999, 0.261),
                                                                                          ('BAA', 50000000, 79999999, 0.261),
                                                                                          ('BAA', 80000000, 999999999999, 0.261);`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "dim_interest_rates"`);
  }
}
