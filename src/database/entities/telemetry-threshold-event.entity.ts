import { Column, Entity, Index } from 'typeorm';
import { BaseEntityWithIdAndTimestamps } from './common/base-entity-with-id-and-timestamps';
import { TelemetryMeasure } from './enums/telmetry.enum';

@Entity({
  name: 'telemetry_threshold_events',
})
@Index('idx_telemetry_type_created_at', ['type', 'createdAt'])
export class TelemetryThresholdEvent extends BaseEntityWithIdAndTimestamps {
  @Column({
    type: 'enum',
    enum: TelemetryMeasure,
    nullable: false,
  })
  public type: TelemetryMeasure;

  @Column({
    type: 'float',
    nullable: false,
  })
  public value: number;
}
