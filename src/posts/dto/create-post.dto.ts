import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    required: true,
    example: '제목1',
    description: '제목',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  readonly title: string;

  @ApiProperty({
    required: true,
    example: '내용1',
    description: '내용',
  })
  @IsString()
  @MinLength(1)
  readonly content: string;

  @ApiProperty({
    required: true,
    example: 'wjnfkjdnskjankl',
    description: '유저 아이디',
  })
  @IsString()
  @MinLength(1)
  readonly userId: string;
}
