import { Column, Entity } from 'typeorm';
import { BaseEntityWithIdAndTimestamps } from './common/base-entity-with-id-and-timestamps';
import { TelemetryMeasure } from './enums/telmetry.enum';

@Entity({
  name: 'telemetry_thresholds',
})
export class TelemetryThreshold extends BaseEntityWithIdAndTimestamps {
  @Column({
    type: 'enum',
    enum: TelemetryMeasure,
    unique: true,
    nullable: false,
  })
  public type: TelemetryMeasure;

  @Column({
    type: 'float',
    nullable: false,
  })
  public value: number;
}
