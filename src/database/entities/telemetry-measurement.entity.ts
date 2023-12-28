import { Column, Entity } from 'typeorm';
import { BaseEntityWithIdAndTimestamps } from './common/base-entity-with-id-and-timestamps';
import { TelemetryMeasure } from './enums/telmetry.enum';

@Entity({
  name: 'telemetry_measurements',
})
export class TelemetryMeasurement extends BaseEntityWithIdAndTimestamps {
  @Column({
    type: 'enum',
    enum: TelemetryMeasure,
  })
  public type: TelemetryMeasure;

  @Column({
    type: 'timestamptz',
    nullable: false,
  })
  public issuedAt: Date;

  @Column({
    type: 'float',
    nullable: false,
  })
  public value: number;
}
