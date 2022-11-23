import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { PostEntity } from '../../posts/entities/post.entity';

@Entity('PostReview')
export class PostReviewEntity {
  @ApiProperty({
    required: true,
    example: 1,
    description: '리뷰 아이디',
  })
  @PrimaryColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty({
    required: true,
    example: '내용1',
    description: '내용',
  })
  @Column('text', { name: 'content' })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToOne(() => PostEntity, (posts) => posts.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'PostId', referencedColumnName: 'id' }])
  Post: PostEntity;
}
