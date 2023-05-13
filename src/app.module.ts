import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MonobankModule } from './monobank/monobank.module';
import { ConfigModule } from '@nestjs/config';
import { NotionModule } from './notion/notion.module';

@Module({
  imports: [
    MonobankModule,
    NotionModule.forRootFromEnv(),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
