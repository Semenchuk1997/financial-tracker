import { Module } from '@nestjs/common';
import { MonobankService } from './monobank.service';
import { MONOBANK_KEY } from './constants';
import { ConfigModule } from '@nestjs/config';
import { MonobankConfigService } from './config.service';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: MONOBANK_KEY,
      useValue: process.env.MONOBANK_KEY,
    },
    MonobankService,
    MonobankConfigService,
  ],
  exports: [MonobankService],
})
export class MonobankModule {}
