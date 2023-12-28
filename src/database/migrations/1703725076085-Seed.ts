import { MigrationInterface, QueryRunner } from 'typeorm';
import { TelemetryMeasure } from '../entities/enums/telmetry.enum';

export class Seed1703725076085 implements MigrationInterface {
  name = 'Seed1703725076085';

  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      `INSERT INTO telemetry_thresholds (type, value) VALUES ('${TelemetryMeasure.Temperature}', 10)`,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
