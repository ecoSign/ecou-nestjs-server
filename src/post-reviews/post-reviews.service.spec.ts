import { Test, TestingModule } from '@nestjs/testing';
import { PostReviewsService } from './post-reviews.service';

describe('PostReviewsService', () => {
  let service: PostReviewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostReviewsService],
    }).compile();

    service = module.get<PostReviewsService>(PostReviewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
