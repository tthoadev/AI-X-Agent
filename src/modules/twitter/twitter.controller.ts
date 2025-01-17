import { Body, Controller, Post } from '@nestjs/common';
import { TwitterService } from './twitter.service';

@Controller('twitter')
export class TwitterController {
  constructor(private readonly twitterService: TwitterService) {}

  @Post('tweet')
  async tweet(@Body('content') content: string): Promise<{ success: boolean }> {
    await this.twitterService.postTweet(content);
    return { success: true };
  }
}
