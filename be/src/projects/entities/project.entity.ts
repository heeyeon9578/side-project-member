import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';

@Entity()
@ApiTags('projects')
export class Project {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: '프로젝트 ID' })
  id: number;

  @ApiProperty({ description: '프로젝트 제목' })
  @Column()
  title: string;

  @ApiProperty({ description: '프로젝트 설명' })
  @Column('text')
  description: string;

  @ApiProperty({ description: '프로젝트 썸네일' })
  @Column({ nullable: true })
  thumbnail: string;

  @ApiProperty({ description: '프로젝트 기술 스택' })
  @Column('text', { array: true })
  skills: string[];

  @ApiProperty({ description: '프로젝트 카테고리' })
  @Column({ nullable: true })
  category: string;

  @ApiProperty({ description: '프로젝트 포지션' })
  @Column('text', { array: true })
  positions: string[];

  @ApiProperty({ description: '프로젝트 마감일' })
  @Column({ type: 'date', nullable: true })
  deadline: Date;

  @ApiProperty({ description: '프로젝트 최대 멤버 수' })
  @Column({ nullable: true })
  maxMembers: number;

  @ApiProperty({ description: '프로젝트 기간' })
  @Column({ nullable: true })
  duration: string;

  @ApiProperty({ description: '프로젝트 원격 여부' })
  @Column({ default: true })
  isRemote: boolean;

  @ApiProperty({ description: '프로젝트 미팅 노트' })
  @Column({ nullable: true })
  meetingNote: string;

  @ApiProperty({ description: '프로젝트 소유자' })
  @ManyToOne(() => User, (user) => user.projects, { onDelete: 'CASCADE' })
  owner: User;

  @ApiProperty({ description: '프로젝트 GitHub URL' })
  @Column({ nullable: true })
  githubUrl: string;

  @ApiProperty({ description: '프로젝트 홈페이지 URL' })
  @Column({ nullable: true })
  homepageUrl: string;

  @ApiProperty({ description: '프로젝트 생성일' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: '프로젝트 수정일' })
  @UpdateDateColumn()
  updatedAt: Date;
}
