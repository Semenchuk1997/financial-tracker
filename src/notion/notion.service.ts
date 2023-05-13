import { Inject, Injectable } from '@nestjs/common';
import { NotionConfigService } from './config.service';
import { NotionService } from 'nestjs-notion';

@Injectable()
export class NotionClientService {
  @Inject() private readonly config: NotionConfigService;
  @Inject() private readonly notion: NotionService;

  async getDatabase() {
    return this.notion.databases.retrieve({
      database_id: this.config.notionDatabaseId,
    });
  }

  async createDatabase(): Promise<any> {
    return await this.notion.databases;
  }
}
