import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Project } from 'src/projects/entities/project.entity';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

@Entity()
@ApiTags('users')
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: '사용자 ID' })
  id: number;

  @Column({ length: 100 })
  @ApiProperty({ description: '사용자 이름' })
  name: string;

  @Column()
  @ApiProperty({ description: '비밀번호 (해시값)' })
  password: string;

  @Column({ unique: true })
  @ApiProperty({ description: '사용자 이메일' })
  email: string;

  @Column({ nullable: true })
  @ApiProperty({ description: '사용자 프로필 이미지' })
  avatar: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ description: '사용자 소개' })
  bio: string;

  @CreateDateColumn()
  @ApiProperty({ description: '사용자 생성일' })
  created_at: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: '사용자 수정일' })
  updated_at: Date;

  @OneToMany(() => Project, (project) => project.owner)
  @ApiProperty({ description: '사용자 프로젝트' })
  projects: Project[];
}
