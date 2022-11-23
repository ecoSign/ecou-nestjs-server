import { PartialType } from '@nestjs/swagger';
import { CreatePostReviewDto } from './create-post-review.dto';

export class UpdatePostReviewDto extends PartialType(CreatePostReviewDto) {}
