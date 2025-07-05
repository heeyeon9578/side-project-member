import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { User } from './users/user.entity';
import { Project } from './projects/entities/project.entity';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });
  if (process.env.NODE_ENV !== 'production') {
    // 개발 환경에서는 Swagger 열어주기
    const config = new DocumentBuilder()
      .setTitle('사이드 프로젝트 모집 API')
      .setDescription('백엔드 API 문서')
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'Authorization',
          description: 'JWT 토큰 입력',
          in: 'header',
        },
        'access-token', // 👈 이 키가 중요!
      )
      .addCookieAuth('accessToken', {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'JWT 토큰 입력',
        in: 'header',
      })
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    console.log('✅ User entity: ', User.name);
    console.log('✅ Project entity: ', Project.name);
  }

  await app.listen(5001); // ✅ 포트 5001으로 수정
}
bootstrap();
