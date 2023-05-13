import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MonobankModule } from './monobank/monobank.module';
import { ConfigModule } from '@nestjs/config';
import { NotionClientModule } from './notion/notion.module';

@Module({
  imports: [
    MonobankModule,
    NotionClientModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
