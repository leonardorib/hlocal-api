import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddressModifications1641154019124 implements MigrationInterface {
	name = 'AddressModifications1641154019124';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "responsibles" DROP COLUMN "addressCep"`,
		);
		await queryRunner.query(
			`ALTER TABLE "responsibles" DROP COLUMN "addressFormatted"`,
		);
		await queryRunner.query(
			`ALTER TABLE "locations" DROP COLUMN "addressCep"`,
		);
		await queryRunner.query(
			`ALTER TABLE "locations" DROP COLUMN "addressFormatted"`,
		);
		await queryRunner.query(
			`ALTER TABLE "responsibles" ADD "address_cep" text NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "responsibles" ADD "address_state" text NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "responsibles" ADD "address_city" text NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "responsibles" ADD "address_street" text NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "responsibles" ADD "address_street_number" integer NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "responsibles" ADD "address_neighborhood" text NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "locations" ADD "address_cep" text NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "locations" ADD "address_state" text NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "locations" ADD "address_city" text NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "locations" ADD "address_street" text NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "locations" ADD "address_street_number" integer NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "locations" ADD "address_neighborhood" text NOT NULL`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "locations" DROP COLUMN "address_neighborhood"`,
		);
		await queryRunner.query(
			`ALTER TABLE "locations" DROP COLUMN "address_street_number"`,
		);
		await queryRunner.query(
			`ALTER TABLE "locations" DROP COLUMN "address_street"`,
		);
		await queryRunner.query(
			`ALTER TABLE "locations" DROP COLUMN "address_city"`,
		);
		await queryRunner.query(
			`ALTER TABLE "locations" DROP COLUMN "address_state"`,
		);
		await queryRunner.query(
			`ALTER TABLE "locations" DROP COLUMN "address_cep"`,
		);
		await queryRunner.query(
			`ALTER TABLE "responsibles" DROP COLUMN "address_neighborhood"`,
		);
		await queryRunner.query(
			`ALTER TABLE "responsibles" DROP COLUMN "address_street_number"`,
		);
		await queryRunner.query(
			`ALTER TABLE "responsibles" DROP COLUMN "address_street"`,
		);
		await queryRunner.query(
			`ALTER TABLE "responsibles" DROP COLUMN "address_city"`,
		);
		await queryRunner.query(
			`ALTER TABLE "responsibles" DROP COLUMN "address_state"`,
		);
		await queryRunner.query(
			`ALTER TABLE "responsibles" DROP COLUMN "address_cep"`,
		);
		await queryRunner.query(
			`ALTER TABLE "locations" ADD "addressFormatted" character varying NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "locations" ADD "addressCep" character varying NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "responsibles" ADD "addressFormatted" character varying NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "responsibles" ADD "addressCep" character varying NOT NULL`,
		);
	}
}
