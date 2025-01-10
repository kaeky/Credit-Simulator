import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingSimulationEntity1736480102694 implements MigrationInterface {
    name = 'AddingSimulationEntity1736480102694'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "mvd_simulation" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "clientId" integer, CONSTRAINT "PK_9bab944e96c770a4e871973ffdd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "mvd_simulation" ADD CONSTRAINT "FK_9c019b7e762b9ce71fbe31b6edf" FOREIGN KEY ("clientId") REFERENCES "dim_client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mvd_simulation" DROP CONSTRAINT "FK_9c019b7e762b9ce71fbe31b6edf"`);
        await queryRunner.query(`DROP TABLE "mvd_simulation"`);
    }

}
