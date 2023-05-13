import { Controller, Get, HttpCode, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ClientInfo,
  CurrencyRate,
  Statement,
} from './monobank/monobank.interfaces';

@Controller('api')
export class AppController {
  @Inject() private readonly appService: AppService;

  @Get('exchange-rates')
  async getExchangeRates(): Promise<CurrencyRate[]> {
    return await this.appService.getExchangeRates();
  }

  @Get('client-info')
  async getClientInfo(): Promise<ClientInfo> {
    return await this.appService.getClientInfo();
  }

  @Get('account/premium')
  async getPremiumAccountStatements(): Promise<Statement[]> {
    return await this.appService.getPremiumAccountStatements();
  }

  @Get('webhook')
  @HttpCode(200)
  async webhook(): Promise<string> {
    return 'ok';
  }

  @Post('webhook')
  @HttpCode(200)
  async webhookHandler(event: any): Promise<string> {
    console.log(event);
    return 'ok';
  }
}
