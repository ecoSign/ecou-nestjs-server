import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostReviewsService } from './post-reviews.service';
import { CreatePostReviewDto } from './dto/create-post-review.dto';
import { UpdatePostReviewDto } from './dto/update-post-review.dto';

@Controller('post-reviews')
export class PostReviewsController {
  constructor(private readonly postReviewsService: PostReviewsService) {}

  @Post()
  create(@Body() createPostReviewDto: CreatePostReviewDto) {
    return this.postReviewsService.create(createPostReviewDto);
  }

  @Get()
  findAll() {
    return this.postReviewsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postReviewsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostReviewDto: UpdatePostReviewDto,
  ) {
    return this.postReviewsService.update(+id, updatePostReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postReviewsService.remove(+id);
  }
}
