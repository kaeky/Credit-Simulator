import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingOffers1736486431137 implements MigrationInterface {
    name = 'AddingOffers1736486431137'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "dim_credit_offer" ("id" SERIAL NOT NULL, "amount" integer NOT NULL, "status" character varying NOT NULL, "term" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "clientId" integer, CONSTRAINT "PK_2b1faf8792268dd6bbc24badc90" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "dim_credit_offer" ADD CONSTRAINT "FK_10b78b646a13e361e16ecc98c63" FOREIGN KEY ("clientId") REFERENCES "dim_client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dim_credit_offer" DROP CONSTRAINT "FK_10b78b646a13e361e16ecc98c63"`);
        await queryRunner.query(`DROP TABLE "dim_credit_offer"`);
    }

}
