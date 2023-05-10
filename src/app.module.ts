import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NOTION, NOTION_DATABASE_ID } from './constants';
import { MonobankModule } from './monobank/monobank.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MonobankModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: NOTION,
      useValue: process.env.NOTION_KEY,
    },
    {
      provide: NOTION_DATABASE_ID,
      useValue: process.env.NOTION_DATABASE_ID,
    },
    AppService,
  ],
})
export class AppModule {}
