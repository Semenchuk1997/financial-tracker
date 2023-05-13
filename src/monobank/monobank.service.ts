import { Inject, Injectable, Logger } from '@nestjs/common';
import { WHITELIST_PAIRS } from './constants';
import { ClientInfo, CurrencyRate, Statement } from './monobank.interfaces';
import axios from 'axios';
import { MonobankConfigService } from './config.service';

const MONOBANK_CURRENCY_URL = 'https://api.monobank.ua/bank/currency';
const MONOBANK_CLIENT_INFO_URL = 'https://api.monobank.ua/personal/client-info';
const MONOBANK_STATEMENT_URL = 'https://api.monobank.ua/personal/statement';

@Injectable()
export class MonobankService {
  @Inject() private readonly config: MonobankConfigService;
  private readonly logger = new Logger('MonobankService');

  async getExchangeRates(): Promise<CurrencyRate[]> {
    const data = await this.request<CurrencyRate[]>(MONOBANK_CURRENCY_URL);

    return data.filter((rate) =>
      WHITELIST_PAIRS.some(
        (pair) =>
          pair[0] === rate.currencyCodeA && pair[1] === rate.currencyCodeB,
      ),
    );
  }

  async getClientInfo(): Promise<ClientInfo> {
    return await this.request<ClientInfo>(MONOBANK_CLIENT_INFO_URL);
  }

  async getStatements(
    account: string,
    from: number,
    to: number,
  ): Promise<Statement[]> {
    const url = `${MONOBANK_STATEMENT_URL}/${account}/${from}/${to}`;

    return await this.request<Statement[]>(url);
  }

  async getPremiumAccountStatements(): Promise<Statement[]> {
    const startMonth = this.getMonthStartTimestamp();
    const now = Math.floor(Date.now() / 1000);

    return await this.getStatements('3bOJZpOL2QYvRSaK6ypWrg', startMonth, now);
  }

  private getMonthStartTimestamp(): number {
    const now = new Date();
    const startMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    startMonth.setHours(0, 0, 0, 0);

    return startMonth.getTime() / 1000;
  }

  async request<T>(url: string): Promise<T> {
    this.logger.log(`Requesting ${url}`);

    const response = await axios.get<T>(url, {
      headers: { 'X-Token': this.config.monobankKey },
    });

    return response.data;
  }
}
