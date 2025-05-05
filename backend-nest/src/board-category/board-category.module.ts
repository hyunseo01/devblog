import { Module } from '@nestjs/common';
import { BoardCategoryService } from './board-category.service';
import { BoardCategoryController } from './board-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardCategory } from './entities/board-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BoardCategory])],
  controllers: [BoardCategoryController],
  providers: [BoardCategoryService],
})
export class BoardCategoryModule {}
