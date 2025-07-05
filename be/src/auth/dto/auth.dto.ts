import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: '사용자 이메일', example: 'test@naver.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: '사용자 비밀번호', example: 'test1234' })
  @IsString()
  password: string;
}
