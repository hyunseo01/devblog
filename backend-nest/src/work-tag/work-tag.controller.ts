import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkTagService } from './work-tag.service';
import { CreateWorkTagDto } from './dto/create-work-tag.dto';
import { UpdateWorkTagDto } from './dto/update-work-tag.dto';

@Controller('work-tag')
export class WorkTagController {
  constructor(private readonly workTagService: WorkTagService) {}

  @Post()
  create(@Body() createWorkTagDto: CreateWorkTagDto) {
    return this.workTagService.create(createWorkTagDto);
  }

  @Get()
  findAll() {
    return this.workTagService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workTagService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkTagDto: UpdateWorkTagDto) {
    return this.workTagService.update(+id, updateWorkTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workTagService.remove(+id);
  }
}
