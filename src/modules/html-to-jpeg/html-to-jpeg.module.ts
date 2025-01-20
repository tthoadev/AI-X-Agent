import { Module } from '@nestjs/common';
import { HtmlToJpegService } from './html-to-jpeg.service';
import { HtmlToJpegController } from './html-to-jpeg.controller';

@Module({
  providers: [HtmlToJpegService],
  controllers: [HtmlToJpegController]
})
export class HtmlToJpegModule {}
