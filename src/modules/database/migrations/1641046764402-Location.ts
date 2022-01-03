import { MigrationInterface, QueryRunner } from 'typeorm';

export class Location1641046764402 implements MigrationInterface {
	name = 'Location1641046764402';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "locations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "addressCep" character varying NOT NULL, "addressFormatted" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "companyId" uuid, CONSTRAINT "PK_7cc1c9e3853b94816c094825e74" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(
			`ALTER TABLE "locations" ADD CONSTRAINT "FK_aa1663e9ee4cefa986683fde5b7" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "locations" DROP CONSTRAINT "FK_aa1663e9ee4cefa986683fde5b7"`,
		);
		await queryRunner.query(`DROP TABLE "locations"`);
	}
}
