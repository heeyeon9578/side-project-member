import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectsService {
  findAll() {
    return [
      { id: 1, title: '사이드 프로젝트 구함', stack: ['Next.js', 'Nest.js'] },
      { id: 2, title: '토이 프로젝트 팀원 모집', stack: ['Vue', 'Spring'] },
    ];
  }
}
