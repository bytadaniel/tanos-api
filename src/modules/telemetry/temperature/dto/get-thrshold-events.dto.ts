import { Transform, Type } from 'class-transformer';
import { IsDate, IsIn, IsInt, IsOptional } from 'class-validator';

export class GetThresholdEventsDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  public start?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  public end?: number;
}
