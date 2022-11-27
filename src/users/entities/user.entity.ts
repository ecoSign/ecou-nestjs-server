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
import { PostEntity } from '../../posts/entities/post.entity';

@Entity('User')
export class UserEntity {
  @ApiProperty({
    example: 1,
    description: '사용자 아이디',
  })
  @PrimaryColumn({ name: 'id' })
  id: string;

  @ApiProperty({
    required: true,
    example: 'luke',
    description: '닉네임',
  })
  @Column('varchar', { name: 'nickname', length: 30 })
  nickname: string;

  @ApiProperty({
    required: true,
    example: 'temp7045@gmail.com',
    description: '이메일',
  })
  @Column('varchar', { name: 'email', unique: true, length: 60 })
  email: string;

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

  @OneToMany(() => PostEntity, (posts) => posts.Owner, {})
  Posts: PostEntity[];
}
