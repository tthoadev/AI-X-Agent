import { Injectable } from '@nestjs/common';
import * as ccxt from 'ccxt';

@Injectable()
export class MarketService {
  private binance: ccxt.binance;

  constructor() {
    this.binance = new ccxt.binance({
      enableRateLimit: true,
    });
  }

  async getCandles(
    symbol: string,
    timeframe: string,
    candleCount: number,
  ): Promise<any[]> {
    try {
      const now = Date.now();
      const timeframeInMilliseconds =
        this.binance.parseTimeframe(timeframe) * 1000;
      const since = now - candleCount * timeframeInMilliseconds;

      const candles = await this.binance.fetchOHLCV(symbol, timeframe, since);

      return candles.map(([timestamp, open, high, low, close, volume]) => ({
        timestamp,
        open: Number(open),
        high: Number(high),
        low: Number(low),
        close: Number(close),
        volume: Number(volume),
      }));
    } catch (error) {
      throw new Error(`Failed to fetch candles: ${error.message}`);
    }
  }
}
