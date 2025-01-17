import { Controller, Get, Query } from '@nestjs/common';
import { MarketService } from './market.service';

@Controller('market')
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

  @Get('candles')
  async getCandles(
    @Query('symbol') symbol: string,
    @Query('timeframe') timeframe: string,
    @Query('candleCount') candleCount: number,
  ) {
    if (!symbol || !timeframe) {
      return { error: 'Missing required parameters: symbol and timeframe' };
    }

    const candles = await this.marketService.getCandles(
      symbol,
      timeframe,
      candleCount,
    );
    return { data: candles };
  }
}
