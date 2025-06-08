import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Project } from './entities/project.entity';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @ApiOperation({ summary: '모든 프로젝트 조회' })
  @ApiResponse({ status: 200, description: '프로젝트 목록 조회 성공' })
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '특정 프로젝트 조회' })
  @ApiResponse({ status: 200, description: '프로젝트 조회 성공' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.projectsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: '프로젝트 생성' })
  @ApiResponse({ status: 201, description: '프로젝트 생성 성공' })
  create(@Body() data: Partial<Project>) {
    return this.projectsService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: '프로젝트 수정' })
  @ApiResponse({ status: 200, description: '프로젝트 수정 성공' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Project>,
  ) {
    return this.projectsService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: '프로젝트 삭제' })
  @ApiResponse({ status: 200, description: '프로젝트 삭제 성공' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.projectsService.delete(id);
  }
}
