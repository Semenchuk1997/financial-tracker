import { Module } from '@nestjs/common';
import { MonobankService } from './monobank.service';
import { ConfigModule } from '@nestjs/config';
import { MonobankConfigService } from './config.service';

@Module({
  imports: [ConfigModule],
  providers: [MonobankService, MonobankConfigService],
  exports: [MonobankService],
})
export class MonobankModule {}
