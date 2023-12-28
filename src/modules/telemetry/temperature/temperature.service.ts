import { Inject, Injectable } from '@nestjs/common';
import { CreateTemperatureMeasurementDto } from './dto/create-temperature-measurement.dto';
import { UpdateTemperatureThresholdDto } from './dto/update-temperature-threshold.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TelemetryMeasurement } from 'src/database/entities/telemetry-measurement.entity';
import { ThresholdMonitorService } from './threshold-monitor/threshold-monitor.service';
import { TelemetryThreshold } from 'src/database/entities/telemetry-threshold.entity';
import { TelemetryMeasure } from 'src/database/entities/enums/telmetry.enum';
import { GetThresholdEventsDto } from './dto/get-thrshold-events.dto';
import { TelemetryThresholdEvent } from 'src/database/entities/telemetry-threshold-event.entity';

@Injectable()
export class TemperatureService {
  constructor(
    @InjectRepository(TelemetryMeasurement)
    private readonly telemetryMeasurementRepository: Repository<TelemetryMeasurement>,
    @InjectRepository(TelemetryThreshold)
    private readonly telemetryThresholdRepository: Repository<TelemetryThreshold>,
    @InjectRepository(TelemetryThresholdEvent)
    private readonly telemetryThresholdEventRepository: Repository<TelemetryThresholdEvent>,
    @Inject(ThresholdMonitorService)
    private readonly thresholdMonitorService: ThresholdMonitorService,
  ) {}

  public async getThresholdEvents({ start, end }: GetThresholdEventsDto) {
    const query =
      this.telemetryThresholdEventRepository.createQueryBuilder('event');

    query.where('event.type = :type', { type: TelemetryMeasure.Temperature });
    if (start) {
      query.andWhere('event.created_at >= :start', { start: new Date(start) });
    }
    if (end) {
      query.andWhere('event.created_at <= :end', { end: new Date(end) });
    }

    return query.getMany();
  }

  public async createMeasurement({
    temperature,
    timestamp,
  }: CreateTemperatureMeasurementDto) {
    const measurement = this.telemetryMeasurementRepository.create();

    measurement.type = TelemetryMeasure.Temperature;
    measurement.value = temperature;
    measurement.issuedAt = timestamp;

    await measurement.save();

    /**
     * Side-Effects
     */
    await this.thresholdMonitorService.onMeasurement(temperature);

    return measurement;
  }

  public async updateThreshold({ type, value }: UpdateTemperatureThresholdDto) {
    const threshold = await this.telemetryThresholdRepository.findOneByOrFail({
      type,
    });

    threshold.value = value;
    await threshold.save();

    /**
     * Side-Effects
     */
    this.thresholdMonitorService.setThreshold(value);

    return threshold;
  }
}
