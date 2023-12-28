import { Module } from '@nestjs/common';
import { TemperatureService } from './temperature/temperature.service';
import { TemperatureController } from './temperature/temperature.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelemetryThreshold } from 'src/database/entities/telemetry-threshold.entity';
import { TelemetryMeasurement } from 'src/database/entities/telemetry-measurement.entity';
import { TelemetryThresholdEvent } from 'src/database/entities/telemetry-threshold-event.entity';
import { ThresholdMonitorService } from './temperature/threshold-monitor/threshold-monitor.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TelemetryMeasurement,
      TelemetryThreshold,
      TelemetryThresholdEvent,
    ]),
  ],
  controllers: [TemperatureController],
  providers: [TemperatureService, ThresholdMonitorService],
})
export class TelemetryModule {}
