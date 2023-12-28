import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1703724942647 implements MigrationInterface {
  name = 'InitialMigration1703724942647';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."telemetry_measurements_type_enum" AS ENUM('temperature')`,
    );
    await queryRunner.query(
      `CREATE TABLE "telemetry_measurements" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "type" "public"."telemetry_measurements_type_enum" NOT NULL, "issued_at" TIMESTAMP WITH TIME ZONE NOT NULL, "value" double precision NOT NULL, CONSTRAINT "PK_22bdf1c4dfe29758ac2daa0c842" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."telemetry_threshold_events_type_enum" AS ENUM('temperature')`,
    );
    await queryRunner.query(
      `CREATE TABLE "telemetry_threshold_events" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "type" "public"."telemetry_threshold_events_type_enum" NOT NULL, "value" double precision NOT NULL, CONSTRAINT "PK_de82fd970fc2a7f2da22f55ee0a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_telemetry_type_created_at" ON "telemetry_threshold_events" ("type", "created_at") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."telemetry_thresholds_type_enum" AS ENUM('temperature')`,
    );
    await queryRunner.query(
      `CREATE TABLE "telemetry_thresholds" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "type" "public"."telemetry_thresholds_type_enum" NOT NULL, "value" double precision NOT NULL, CONSTRAINT "UQ_f198925011a324c1ee47e98d513" UNIQUE ("type"), CONSTRAINT "PK_0469aacfda2e7dffac48626d0e2" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "telemetry_thresholds"`);
    await queryRunner.query(
      `DROP TYPE "public"."telemetry_thresholds_type_enum"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."idx_telemetry_type_created_at"`,
    );
    await queryRunner.query(`DROP TABLE "telemetry_threshold_events"`);
    await queryRunner.query(
      `DROP TYPE "public"."telemetry_threshold_events_type_enum"`,
    );
    await queryRunner.query(`DROP TABLE "telemetry_measurements"`);
    await queryRunner.query(
      `DROP TYPE "public"."telemetry_measurements_type_enum"`,
    );
  }
}
