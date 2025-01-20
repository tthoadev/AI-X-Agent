import { Injectable, Logger } from '@nestjs/common';
import { Scraper } from 'agent-twitter-client';

import { loadCookiesFromFile, saveCookiesToFile } from './utils/cookie-handler';

@Injectable()
export class TwitterService {
  private readonly logger = new Logger(TwitterService.name);
  private scraper: Scraper;

  constructor() {
    this.scraper = new Scraper();
    this.initializeScraper();
  }

  private async initializeScraper(): Promise<void> {
    try {
      const cookies = loadCookiesFromFile();
      if (cookies) {
        await this.scraper.setCookies(cookies);
        if (await this.scraper.isLoggedIn()) {
          this.logger.verbose('Logged in using cookies.');
          return;
        }
        this.logger.warn('Cookies invalid. Logging in...');
      }
      await this.login();
    } catch (error) {
      this.logger.error(
        `Error during scraper initialization: ${error.message}`,
      );
    }
  }

  async login(): Promise<void> {
    const username = process.env.TWITTER_USERNAME;
    const email = process.env.TWITTER_EMAIL;
    const password = process.env.TWITTER_PASSWORD;
    if (!username || !password || !email) {
      throw new Error(
        'Twitter credentials not found in environment variables.',
      );
    }
    await this.scraper.login(username, password, email);
    const cookies = await this.scraper.getCookies();
    saveCookiesToFile(cookies);
    this.logger.log('Logged in and cookies saved.');
  }

  async postTweet(
    content: string,
    mediaData: { data: Buffer; mediaType: string }[] = [],
  ): Promise<void> {
    try {
      if (mediaData.length > 0) {
        this.logger.log(
          `Uploading ${mediaData.length} media files with content: "${content}"`,
        );
      } else {
        this.logger.log(`Sending tweet without media: "${content}"`);
      }

      await this.scraper.sendTweet(content, undefined, mediaData);

      this.logger.log('Tweet posted successfully!');
    } catch (error) {
      this.logger.error(`Error posting tweet: ${error.message}`);
    }
  }
}
