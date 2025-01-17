import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TwitterModule } from './modules/twitter/twitter.module';
import { MarketModule } from './modules/market/market.module';

@Module({
  imports: [
    TwitterModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MarketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
