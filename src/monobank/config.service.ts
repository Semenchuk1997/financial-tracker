import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MonobankConfigService {
  @Inject() private readonly configService: ConfigService;

  get monobankKey(): string {
    return this.configService.get<string>('MONOBANK_KEY');
  }
}
