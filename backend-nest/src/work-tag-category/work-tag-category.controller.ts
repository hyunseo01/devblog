import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkTagCategoryService } from './work-tag-category.service';
import { CreateWorkTagCategoryDto } from './dto/create-work-tag-category.dto';
import { UpdateWorkTagCategoryDto } from './dto/update-work-tag-category.dto';

@Controller('work-tag-category')
export class WorkTagCategoryController {
  constructor(private readonly workTagCategoryService: WorkTagCategoryService) {}

  @Post()
  create(@Body() createWorkTagCategoryDto: CreateWorkTagCategoryDto) {
    return this.workTagCategoryService.create(createWorkTagCategoryDto);
  }

  @Get()
  findAll() {
    return this.workTagCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workTagCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkTagCategoryDto: UpdateWorkTagCategoryDto) {
    return this.workTagCategoryService.update(+id, updateWorkTagCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workTagCategoryService.remove(+id);
  }
}
