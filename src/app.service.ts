import { Inject, Injectable } from '@nestjs/common';
import { MonobankService } from './monobank/monobank.service';
import {
  ClientInfo,
  CurrencyRate,
  Statement,
} from './monobank/monobank.interfaces';
import { NotionService } from './notion/notion.service';
import { asyncSequential } from './utils/async';

@Injectable()
export class AppService {
  @Inject() private readonly monobankService: MonobankService;
  @Inject() private readonly notionService: NotionService;

  async getExchangeRates(): Promise<CurrencyRate[]> {
    return await this.monobankService.getExchangeRates();
  }

  async getClientInfo(): Promise<ClientInfo> {
    const clientInfo = await this.monobankService.getClientInfo();

    await asyncSequential(clientInfo?.accounts || [], async (account) => {
      await this.notionService.createDatabase(
        'pageId',
        account.maskedPan[0] ?? account.iban,
      );
    });

    return clientInfo;
  }

  async getPremiumAccountStatements(): Promise<Statement[]> {
    return await this.monobankService.getPremiumAccountStatements();
  }
}
