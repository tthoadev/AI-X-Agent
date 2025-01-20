import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class HtmlToJpegService {
  async convertToImage(url: string): Promise<Buffer> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({
      width: 430,
      height: 332,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
    });

    await page.goto(url, { waitUntil: 'networkidle0' });

    const imageBuffer = Buffer.from(await page.screenshot({ type: 'jpeg' }));

    await browser.close();
    return imageBuffer;
  }
}
