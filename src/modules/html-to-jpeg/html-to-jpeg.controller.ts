import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';

import { HtmlToJpegService } from './html-to-jpeg.service';

@Controller('html-to-jpeg')
export class HtmlToJpegController {
  constructor(private readonly htmlToJpegService: HtmlToJpegService) {}

  @Get('generate-image')
  async generateImage(
    @Query() query: any,
    @Res() res: Response,
  ): Promise<void> {
    const baseUrl = process.env.BASE_URL_FE + '/data-grid';
    const queryParams = new URLSearchParams(query).toString();
    const url = `${baseUrl}?${queryParams}`;

    const imageBuffer = await this.htmlToJpegService.convertToImage(url);

    res.setHeader('Content-Type', 'image/jpeg');
    res.send(imageBuffer);
  }
}
