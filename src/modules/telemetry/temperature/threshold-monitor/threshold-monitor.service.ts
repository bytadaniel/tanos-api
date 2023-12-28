import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TelemetryMeasure } from 'src/database/entities/enums/telmetry.enum';
import { TelemetryThresholdEvent } from 'src/database/entities/telemetry-threshold-event.entity';
import { TelemetryThreshold } from 'src/database/entities/telemetry-threshold.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ThresholdMonitorService implements OnApplicationBootstrap {
  private readonly exceedanceLimit: number;
  private declare exceedanceThreshold: number;
  private exceedances: number;

  private readonly logger = new Logger(ThresholdMonitorService.name);

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

  async onApplicationBootstrap() {
    const threshold = await this.telemetryThresholdRepository.findOneByOrFail({
      type: TelemetryMeasure.Temperature,
    });

    this.setThreshold(threshold.value);
  }

  public setThreshold(value: number) {
    this.logger.log(`Set new temperature threshold value to ${value}`);

    this.exceedanceThreshold = value;
  }

  public async onMeasurement(value: number) {
    this.logger.log(
      `Received incoming telemetry temperature value: ${value}. Threshold is ${this.exceedanceThreshold}`,
    );

    if (value <= this.exceedanceThreshold) {
      this.exceedances = 0;
      return;
    }

    this.exceedances++;

    // reset cursor
    if (this.exceedances > this.exceedanceLimit) {
      this.exceedances = this.exceedances % this.exceedanceLimit;
    }

    this.logger.warn(
      `Temperature telemetry value has exceeded ${this.exceedances} times in a row`,
    );

    if (this.exceedances === this.exceedanceLimit) {
      this.logger.error(
        `Excedance count has been reached local threshold. Spawn a new threshold event with latest measurement ${value}`,
      );
      const event = this.telemetryThresholdEventRepository.create();

      event.type = TelemetryMeasure.Temperature;
      event.value = value;

      await event.save();
    }
  }
}
