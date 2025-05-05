import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BoardModule } from './board/board.module';
import { CommentModule } from './comment/comment.module';
import { AdminModule } from './admin/admin.module';
import { ChatModule } from './chat/chat.module';
import { WorkTagModule } from './work-tag/work-tag.module';
import { WorkTagCategoryModule } from './work-tag-category/work-tag-category.module';
import { WorkModule } from './work/work.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { BoardCategoryModule } from './board-category/board-category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 모든 모듈에서 환경 변수 사용 가능
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // 개발 환경에서만 true로 설정
    }),
    UserModule,
    AuthModule,
    BoardModule,
    CommentModule,
    AdminModule,
    ChatModule,
    WorkTagModule,
    WorkTagCategoryModule,
    WorkModule,
    BoardCategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
