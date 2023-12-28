import { Transform } from 'class-transformer';
import { IsDate, IsNumber } from 'class-validator';

export class CreateTemperatureMeasurementDto {
  @IsNumber()
  public temperature: number;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  public timestamp: Date;
}
