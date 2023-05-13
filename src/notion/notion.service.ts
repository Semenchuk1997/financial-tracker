import { Inject, Injectable } from '@nestjs/common';
import { Client } from '@notionhq/client';
import { CONFIG } from './constants';
import { ClientOptions as NotionOptions } from '@notionhq/client/build/src/Client';
import { CreateDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';

@Injectable()
export class NotionService {
  public readonly notion: Client;

  constructor(
    @Inject(CONFIG)
    public readonly options: NotionOptions,
  ) {
    this.notion = new Client(this.options);
  }

  async createDatabase(
    pageId: string,
    name: string,
    // params: CreateDatabaseParameters,
  ): Promise<CreateDatabaseResponse> {
    return await this.notion.databases.create({
      parent: {
        type: 'page_id',
        page_id: 'a467620f-0959-4061-9642-54e25bf5118f',
      },
      title: [
        {
          type: 'text',
          text: {
            content: name,
          },
        },
      ],
      icon: {
        type: 'emoji',
        emoji: '💳',
      },
      properties: {
        Name: {
          title: {},
        },
      },
    });
  }
}
