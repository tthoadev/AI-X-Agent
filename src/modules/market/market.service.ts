import { Injectable } from '@nestjs/common';
import * as ccxt from 'ccxt';

@Injectable()
export class MarketService {
  private binance: ccxt.binance;

  constructor() {
    this.binance = new ccxt.binance({
      enableRateLimit: true,
      options: {
        defaultType: 'future',
      },
    });
  }

  async getCandles(
    symbol: string,
    timeframe: string,
    candleCount: number,
  ): Promise<{ pair: string; candles: any[] }> {
    try {
      const now = Date.now();
      const timeframeInMilliseconds =
        this.binance.parseTimeframe(timeframe) * 1000;
      const since = now - candleCount * timeframeInMilliseconds;

      const candles = await this.binance.fetchOHLCV(symbol, timeframe, since);

      const formattedCandles = candles.map(
        ([timestamp, open, high, low, close, volume]) => ({
          timestamp,
          open: Number(open),
          high: Number(high),
          low: Number(low),
          close: Number(close),
          volume: Number(volume),
        }),
      );

      return {
        pair: symbol,
        candles: formattedCandles,
      };
    } catch (error) {
      throw new Error(`Failed to fetch candles: ${error.message}`);
    }
  }
}
