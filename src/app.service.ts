import { Inject, Injectable } from '@nestjs/common';
import { NOTION, NOTION_DATABASE_ID } from './constants';
import { MonobankService } from './monobank/monobank.service';
import {
  ClientInfo,
  CurrencyRate,
  Statement,
} from './monobank/monobank.interfaces';

@Injectable()
export class AppService {
  @Inject(NOTION) private readonly notionKey: string;
  @Inject(NOTION_DATABASE_ID) private readonly notionDatabaseId: string;
  @Inject() private readonly monobankService: MonobankService;

  async getExchangeRates(): Promise<CurrencyRate[]> {
    return await this.monobankService.getExchangeRates();
  }

  async getClientInfo(): Promise<ClientInfo> {
    return await this.monobankService.getClientInfo();
  }

  async getPremiumAccountStatements(): Promise<Statement[]> {
    const startMonth = this.getMonthStartTimestamp();
    const now = Math.floor(Date.now() / 1000);

    return await this.monobankService.getStatements(
      '3bOJZpOL2QYvRSaK6ypWrg',
      startMonth,
      now,
    );
  }

  private getMonthStartTimestamp(): number {
    const now = new Date();
    const startMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    startMonth.setHours(0, 0, 0, 0);

    return startMonth.getTime() / 1000;
  }
}
