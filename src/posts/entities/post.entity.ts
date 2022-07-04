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

@Entity('Post')
export class PostEntity {
  @ApiProperty({
    required: true,
    example: 1,
    description: '게시물 아이디',
  })
  @PrimaryColumn({ type: 'int', name: 'id' })
  id: number;

  @ApiProperty({
    required: true,
    example: '제목1',
    description: '제목',
  })
  @Column('varchar', { name: 'title', length: 50 })
  title: string;

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

  @ManyToOne(() => UserEntity, (users) => users.id, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'OwnerId', referencedColumnName: 'id' }])
  Owner: UserEntity;
}
