import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  // ✅ 전체 조회
  findAll() {
    return this.projectRepository.find();
  }

  // ✅ 단일 조회
  findOne(id: number) {
    return this.projectRepository.findOne({ where: { id } });
  }

  // ✅ 생성
  create(data: Partial<Project>) {
    const project = this.projectRepository.create(data);
    return this.projectRepository.save(project);
  }

  // ✅ 수정
  async update(id: number, data: Partial<Project>) {
    await this.projectRepository.update(id, data);
    return this.projectRepository.findOne({ where: { id } });
  }

  // ✅ 삭제
  delete(id: number) {
    return this.projectRepository.delete(id);
  }
}
