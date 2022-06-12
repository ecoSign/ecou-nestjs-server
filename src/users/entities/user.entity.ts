import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('User')
export class UserEntity {
  @ApiProperty({
    required: true,
    example: 1,
    description: '사용자 아이디',
  })
  @PrimaryColumn()
  id: string;

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

  deletedAt: Date | null;

  @Column({ length: 60 })
  signupVerifyToken: string;
}
