import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { BoardCategory } from '../board-category/entities/board-category.entity';
import { Comment } from '../comment/entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board, BoardCategory, Comment])],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
