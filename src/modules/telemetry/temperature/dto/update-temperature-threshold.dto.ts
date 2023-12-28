import { IsEnum, IsNumber } from 'class-validator';
import { TelemetryMeasure } from 'src/database/entities/enums/telmetry.enum';

export class UpdateTemperatureThresholdDto {
  @IsEnum(TelemetryMeasure)
  public type: TelemetryMeasure;

  @IsNumber()
  public value: number;
}
