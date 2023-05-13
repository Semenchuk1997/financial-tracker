import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotionConfigService {
  @Inject() private readonly configService: ConfigService;

  get notionKey(): string {
    return this.configService.get<string>('NOTION_KEY');
  }

  get notionDatabaseId(): string {
    return this.configService.get<string>('NOTION_DATABASE_ID');
  }
}
