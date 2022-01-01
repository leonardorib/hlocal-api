import {MigrationInterface, QueryRunner} from "typeorm";

export class Responsible1641055068476 implements MigrationInterface {
    name = 'Responsible1641055068476'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "responsibles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "phone" character varying NOT NULL, "addressCep" character varying NOT NULL, "isMainResponsible" boolean NOT NULL DEFAULT false, "addressFormatted" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "companyId" uuid, "locationId" uuid, CONSTRAINT "PK_3bfd9b63cf33352711d7c82bab3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "responsibles" ADD CONSTRAINT "FK_233614e3f7cff11c42ffae3bb74" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "responsibles" ADD CONSTRAINT "FK_41b4067addf6a7940994c993d16" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "responsibles" DROP CONSTRAINT "FK_41b4067addf6a7940994c993d16"`);
        await queryRunner.query(`ALTER TABLE "responsibles" DROP CONSTRAINT "FK_233614e3f7cff11c42ffae3bb74"`);
        await queryRunner.query(`DROP TABLE "responsibles"`);
    }

}
