import {MigrationInterface, QueryRunner} from "typeorm";

export class createVerificationTable1654257904119 implements MigrationInterface {
    name = 'createVerificationTable1654257904119'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "verification" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "expiredAfter" TIMESTAMP NOT NULL, "userId" integer, CONSTRAINT "PK_f7e3a90ca384e71d6e2e93bb340" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "verification" ADD CONSTRAINT "FK_8300048608d8721aea27747b07a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "verification" DROP CONSTRAINT "FK_8300048608d8721aea27747b07a"`);
        await queryRunner.query(`DROP TABLE "verification"`);
    }

}
