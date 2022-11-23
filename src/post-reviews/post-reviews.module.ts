import { Module } from '@nestjs/common';
import { PostReviewsService } from './post-reviews.service';
import { PostReviewsController } from './post-reviews.controller';

@Module({
  controllers: [PostReviewsController],
  providers: [PostReviewsService]
})
export class PostReviewsModule {}
