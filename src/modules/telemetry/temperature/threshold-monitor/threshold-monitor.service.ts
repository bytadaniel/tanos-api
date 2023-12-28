import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TelemetryMeasure } from 'src/database/entities/enums/telmetry.enum';
import { TelemetryThresholdEvent } from 'src/database/entities/telemetry-threshold-event.entity';
import { TelemetryThreshold } from 'src/database/entities/telemetry-threshold.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ThresholdMonitorService {
  private readonly exceedanceLimit: number;
  private declare exceedanceThreshold: number;
  private exceedances: number;

  constructor(
    @InjectRepository(TelemetryThreshold)
    private readonly telemetryThresholdRepository: Repository<TelemetryThreshold>,
    @InjectRepository(TelemetryThresholdEvent)
    private readonly telemetryThresholdEventRepository: Repository<TelemetryThresholdEvent>,
  ) {
    this.exceedanceLimit = 10;
    this.exceedances = 0;
    this.exceedanceThreshold = null; // is number in runtime
  }

  async onModuleInit() {
    const threshold = await this.telemetryThresholdRepository.findOneByOrFail({
      type: TelemetryMeasure.Temperature,
    });

    this.exceedanceThreshold = threshold.value;
  }

  public setThreshold(value: number) {
    this.exceedanceThreshold = value;
  }

  public async onMeasurement(value: number) {
    if (value <= this.exceedanceThreshold) {
      this.exceedances = 0;
      return;
    }

    this.exceedances++;

    // reset cursor
    if (this.exceedances > this.exceedanceLimit) {
      this.exceedances = this.exceedances % this.exceedanceLimit;
    }

    if (this.exceedances === this.exceedanceLimit) {
      const event = this.telemetryThresholdEventRepository.create();

      event.type = TelemetryMeasure.Temperature;
      event.value = value;

      await event.save();
    }
  }
}
