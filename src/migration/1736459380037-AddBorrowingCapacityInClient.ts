import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBorrowingCapacityInClient1736459380037
  implements MigrationInterface
{
  name = 'AddBorrowingCapacityInClient1736459380037';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "dim_client" ADD "borrowingCapacity" integer NOT NULL DEFAULT 0`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "dim_client" DROP COLUMN "borrowingCapacity"`,
    );
  }
}
