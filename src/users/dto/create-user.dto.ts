import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';
import { NotIn } from '../../utils/decorators/not-in';

export class CreateUserDto {
  @ApiProperty({
    required: true,
    example: 'luke',
    description: '닉네임',
  })
  @Transform((params) => {
    // console.log(params);
    return params.value.trim();
  })
  @NotIn('password', {
    message: 'password는 nickname과 같은 문자열을 포함할 수 없습니다.',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  readonly nickname: string;

  @ApiProperty({
    required: true,
    example: 'temp7045@gmail.com',
    description: '이메일',
  })
  @IsString()
  @IsEmail()
  @MaxLength(60)
  readonly email: string;

  @ApiProperty({
    required: true,
    example: '!a123412',
    description: '비밀번호',
  })
  @Transform(({ value, obj }) => {
    if (value.includes(obj.nickname.trim())) {
      throw new BadRequestException(
        'password는 nickname과 같은 문자열을 포함할 수 없습니다.',
      );
    }
    return value.trim();
  })
  @IsString()
  @Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/)
  readonly password: string;
}
