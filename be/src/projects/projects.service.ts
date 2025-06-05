import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectsService {
  /**
   * @description 모든 프로젝트 조회
   * @returns 모든 프로젝트 목록
   */
  findAll() {
    return [
      { id: 1, title: '사이드 프로젝트 구함', stack: ['Next.js', 'Nest.js'] },
      { id: 2, title: '토이 프로젝트 팀원 모집', stack: ['Vue', 'Spring'] },
    ];
  }
}
