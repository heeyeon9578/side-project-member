import { Controller, Get } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  /**
   * @description 모든 프로젝트 조회
   * @returns 모든 프로젝트 목록
   */
  @Get()
  @ApiOperation({ summary: '모든 프로젝트 조회' })
  @ApiResponse({ status: 200, description: '프로젝트 목록 조회 성공' })
  findAll() {
    return this.projectsService.findAll();
  }
}
