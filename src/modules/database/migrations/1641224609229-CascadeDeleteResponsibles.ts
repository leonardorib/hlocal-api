import { MigrationInterface, QueryRunner } from 'typeorm';

export class CascadeDeleteResponsibles1641224609229
	implements MigrationInterface
{
	name = 'CascadeDeleteResponsibles1641224609229';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "responsibles" DROP CONSTRAINT "FK_233614e3f7cff11c42ffae3bb74"`,
		);
		await queryRunner.query(
			`ALTER TABLE "responsibles" DROP CONSTRAINT "FK_41b4067addf6a7940994c993d16"`,
		);
		await queryRunner.query(
			`ALTER TABLE "responsibles" ADD CONSTRAINT "FK_233614e3f7cff11c42ffae3bb74" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "responsibles" ADD CONSTRAINT "FK_41b4067addf6a7940994c993d16" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "responsibles" DROP CONSTRAINT "FK_41b4067addf6a7940994c993d16"`,
		);
		await queryRunner.query(
			`ALTER TABLE "responsibles" DROP CONSTRAINT "FK_233614e3f7cff11c42ffae3bb74"`,
		);
		await queryRunner.query(
			`ALTER TABLE "responsibles" ADD CONSTRAINT "FK_41b4067addf6a7940994c993d16" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE "responsibles" ADD CONSTRAINT "FK_233614e3f7cff11c42ffae3bb74" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}
}
