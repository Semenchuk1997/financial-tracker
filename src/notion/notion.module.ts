import { Module } from '@nestjs/common';
import { NotionClientService } from './notion.service';
import { NotionConfigService } from './config.service';
import { NotionModule } from 'nestjs-notion';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    NotionModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        auth: configService.get<string>('NOTION_KEY'),
      }),
    }),
  ],
  providers: [NotionClientService, NotionConfigService],
  exports: [NotionClientService],
})
export class NotionClientModule {}
