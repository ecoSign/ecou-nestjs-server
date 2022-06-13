import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MaxLength } from 'class-validator';

export class CreateUserDto {
  // @ApiProperty({
  //   required: true,
  //   example: 1,
  //   description: '아이디',
  // })
  // id: number;

  @ApiProperty({
    required: true,
    example: 'luke',
    description: '닉네임',
  })
  readonly nickname: string;

  @ApiProperty({
    required: true,
    example: 'a@a.com',
    description: '이메일',
  })
  @IsEmail()
  @MaxLength(60)
  readonly email: string;

  @ApiProperty({
    required: true,
    example: '1234',
    description: '비밀번호',
  })
  @IsString()
  @Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/)
  readonly password: string;
}
