import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * @description 테스트용 메서드
   * @returns 테스트 메시지
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
