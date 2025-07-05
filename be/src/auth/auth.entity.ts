import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger';
@Entity()
@ApiTags('auth')
export class Auth {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: '사용자 ID' })
  id: number;

  @ApiProperty({ description: '사용자 이메일' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ description: '사용자 비밀번호' })
  @Column()
  password: string;
}
