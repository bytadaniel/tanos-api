import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { TelemetryModule } from './modules/telemetry/telemetry.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), TelemetryModule],
})
export class AppModule {}
