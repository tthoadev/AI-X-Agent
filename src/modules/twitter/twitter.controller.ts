import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { TwitterService } from './twitter.service';

@Controller('twitter')
export class TwitterController {
  constructor(private readonly twitterService: TwitterService) {}

  @UseInterceptors(FileFieldsInterceptor([{ name: 'media', maxCount: 10 }]))
  @Post('tweet')
  async tweet(
    @Body() data: { content: string },
    @UploadedFiles() files: { media?: Array<Express.MulterFile> },
  ): Promise<{ success: boolean }> {
    const mediaData =
      files?.media?.map((file) => ({
        data: file.buffer,
        mediaType: file.mimetype,
      })) || [];

    await this.twitterService.postTweet(data.content, mediaData);

    return { success: true };
  }
}
