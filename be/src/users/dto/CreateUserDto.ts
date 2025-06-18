import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: '사용자 이름' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: '사용자 이메일' })
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6, { message: '비밀번호는 최소 6자 이상이어야 합니다.' })
  password: string;

  @ApiProperty({ description: '사용자 프로필 이미지', required: false })
  @IsOptional()
  @IsUrl()
  avatar?: string;

  @ApiProperty({ description: '사용자 소개', required: false })
  @IsOptional()
  @IsString()
  bio?: string;
}
