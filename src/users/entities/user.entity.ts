import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Post } from '../../posts/entities/post.entity';

@Entity('users')
export class User {
  @ApiProperty({
    example: 1,
    description: '사용자 아이디',
  })
  @PrimaryColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty({
    required: true,
    example: 'luke',
    description: '닉네임',
  })
  @Column('varchar', { name: 'nickname', length: 30 })
  nickname: string;

  @Column('varchar', { name: 'password', length: 100 })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // @Column('date', {default: () => 'CURRENT_TIMESTAMP'})
  @DeleteDateColumn() // softDelete <-> hardDelete
  deletedAt: Date | null;

  @Column({ length: 60 })
  signupVerifyToken: string;

  @OneToMany(() => Post, (posts) => posts.Owner)
  Posts: Post[];
}
