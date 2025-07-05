import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/CreateUserDto';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: '사용자 생성' })
  @ApiResponse({ status: 201, description: '사용자 생성 성공', type: User })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: '모든 사용자 목록 조회' })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiOperation({ summary: '내 정보 조회 (인증 필요)' })
  @ApiResponse({ status: 200, description: '내 정보', type: User })
  async getMe(@Req() req): Promise<User> {
    console.log('🌐 [ /users/me 요청 들어옴 ]');
    console.log('📜 Headers:', req.headers);
    console.log('🍪 Cookies:', req.cookies);
    console.log('🛡️ req.user:', req.user);

    console.log('✅ 로그인 유저:', req.user);
    // req.user.userId 를 JWT validate()에서 리턴하도록 했으니 사용
    return this.usersService.findOne(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: '특정 사용자 조회' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: '사용자 삭제' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.usersService.remove(id);
  }

  // 만약 UpdateUserDto 있다면 여기에 PUT도 추가 가능
}
