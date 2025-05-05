import { Module } from '@nestjs/common';
import { WorkService } from './work.service';
import { WorkController } from './work.controller';
import { WorkTag } from '../work-tag/entities/work-tag.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Work } from './entities/work.entity';
import { Comment } from '../comment/entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Work, WorkTag, Comment])],
  controllers: [WorkController],
  providers: [WorkService],
})
export class WorkModule {}
