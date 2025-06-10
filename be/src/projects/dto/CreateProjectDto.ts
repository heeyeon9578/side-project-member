import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({ description: '프로젝트 제목' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: '프로젝트 설명' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: '프로젝트 썸네일', required: false })
  @IsOptional()
  @IsString()
  thumbnail?: string;

  @ApiProperty({ description: '기술 스택 (문자열 배열)' })
  @IsArray()
  @IsString({ each: true })
  skills: string[];

  @ApiProperty({ description: '모집 포지션 (문자열 배열)' })
  @IsArray()
  @IsString({ each: true })
  positions: string[];

  @ApiProperty({ description: '프로젝트 카테고리', required: false })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({ description: '마감일', required: false })
  @IsOptional()
  @IsDateString()
  deadline?: string;

  @ApiProperty({ description: '예상 기간', required: false })
  @IsOptional()
  @IsString()
  duration?: string;

  @ApiProperty({ description: '최대 멤버 수', required: false })
  @IsOptional()
  @IsNumber()
  maxMembers?: number;

  @ApiProperty({ description: '원격 여부', required: false, default: true })
  @IsOptional()
  @IsBoolean()
  isRemote?: boolean;

  @ApiProperty({ description: '미팅 노트', required: false })
  @IsOptional()
  @IsString()
  meetingNote?: string;

  @ApiProperty({ description: 'GitHub 저장소 URL', required: false })
  @IsOptional()
  @IsUrl()
  githubUrl?: string;

  @ApiProperty({ description: '홈페이지 URL', required: false })
  @IsOptional()
  @IsUrl()
  homepageUrl?: string;
}
