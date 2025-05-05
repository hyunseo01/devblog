import { Module } from '@nestjs/common';
import { WorkTagService } from './work-tag.service';
import { WorkTagController } from './work-tag.controller';

@Module({
  controllers: [WorkTagController],
  providers: [WorkTagService],
})
export class WorkTagModule {}
