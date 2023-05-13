import { DynamicModule, Module } from '@nestjs/common';
import { ClientOptions as NotionOptions } from '@notionhq/client/build/src/Client';
import { ExternalProvider } from '../utils/external-provider';
import { CONFIG } from './constants';
import { notionConfig } from './notion.config';
import { NotionService } from './notion.service';

@Module({})
export class NotionModule {
  static forRootAsync(options: ExternalProvider<NotionOptions>): DynamicModule {
    return {
      module: NotionModule,
      imports: options.imports,
      global: true,
      providers: [
        {
          provide: CONFIG,
          inject: options.inject,
          useFactory: options.useFactory,
        },
        NotionService,
      ],
      exports: [NotionService],
    };
  }

  static forRootFromEnv() {
    return this.forRootAsync(notionConfig.asProvider());
  }
}
