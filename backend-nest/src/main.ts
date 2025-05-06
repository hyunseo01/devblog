import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors({
    origin: ['http://localhost:3001', 'https://www.devblog.work'],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('DevFolio API')
    .setDescription('개인 포트폴리오 + 블로그 API 문서')
    .setVersion('1.0')
    .addBearerAuth() // JWT 인증 표시
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
