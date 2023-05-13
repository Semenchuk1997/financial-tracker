import { Inject, Injectable } from '@nestjs/common';
import { MonobankService } from './monobank/monobank.service';
import {
  ClientInfo,
  CurrencyRate,
  Statement,
} from './monobank/monobank.interfaces';
import { NotionClientService } from './notion/notion.service';

@Injectable()
export class AppService {
  @Inject() private readonly monobankService: MonobankService;
  @Inject() private readonly notionService: NotionClientService;

  async getExchangeRates(): Promise<CurrencyRate[]> {
    return await this.monobankService.getExchangeRates();
  }

  async getClientInfo(): Promise<ClientInfo> {
    const database = await this.getDatabase();
    console.log(database);

    return await this.monobankService.getClientInfo();
  }

  async getPremiumAccountStatements(): Promise<Statement[]> {
    return await this.monobankService.getPremiumAccountStatements();
  }

  async getDatabase() {
    return await this.notionService.getDatabase();
  }
}
