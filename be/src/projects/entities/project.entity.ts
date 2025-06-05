import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/users/user.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ nullable: true })
  thumbnail: string;

  @Column('text', { array: true })
  skills: string[];

  @Column('text', { array: true })
  positions: string[];

  @Column({ type: 'date', nullable: true })
  deadline: Date;

  @Column({ nullable: true })
  duration: string;

  @Column({ default: true })
  is_remote: boolean;

  @Column({ nullable: true })
  meeting_note: string;

  @ManyToOne(() => User, (user) => user.projects, { onDelete: 'CASCADE' })
  owner: User;

  @Column({ nullable: true })
  github_url: string;

  @Column({ nullable: true })
  homepage_url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
