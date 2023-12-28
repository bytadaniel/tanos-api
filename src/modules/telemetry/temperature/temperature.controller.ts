import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateTemperatureMeasurementDto } from './dto/create-temperature-measurement.dto';
import { UpdateTemperatureThresholdDto } from './dto/update-temperature-threshold.dto';
import { TemperatureService } from './temperature.service';
import { GetThresholdEventsDto } from './dto/get-thrshold-events.dto';

@Controller() // TODO: refactor /temperature
export class TemperatureController {
  constructor(private readonly temperatureService: TemperatureService) {}

  @Post('/measurements')
  public async createMeasurement(
    @Body() createTemperatureMeasurementDto: CreateTemperatureMeasurementDto,
  ) {
    return this.temperatureService.createMeasurement(
      createTemperatureMeasurementDto,
    );
  }

  @Post('/thresholds')
  public async updateThreshold(
    @Body() updateTemperatureThresholdDto: UpdateTemperatureThresholdDto,
  ) {
    return this.temperatureService.updateThreshold(
      updateTemperatureThresholdDto,
    );
  }

  @Get('/events')
  public async getThresholdEvents(
    @Query() getThresholdEventsDto: GetThresholdEventsDto,
  ) {
    return this.temperatureService.getThresholdEvents(getThresholdEventsDto);
  }
}
