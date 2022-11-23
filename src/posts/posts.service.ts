import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,
  ) {}

  create(createPostDto: CreatePostDto) {
    return this.postsRepository.create(createPostDto);
  }

  findAll(): Promise<PostEntity[]> {
    return this.postsRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
