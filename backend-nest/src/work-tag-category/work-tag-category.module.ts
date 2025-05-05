import { Module } from '@nestjs/common';
import { WorkTagCategoryService } from './work-tag-category.service';
import { WorkTagCategoryController } from './work-tag-category.controller';

@Module({
  controllers: [WorkTagCategoryController],
  providers: [WorkTagCategoryService],
})
export class WorkTagCategoryModule {}
