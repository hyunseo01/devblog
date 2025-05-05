import { Injectable } from '@nestjs/common';
import { CreateWorkTagCategoryDto } from './dto/create-work-tag-category.dto';
import { UpdateWorkTagCategoryDto } from './dto/update-work-tag-category.dto';

@Injectable()
export class WorkTagCategoryService {
  create(createWorkTagCategoryDto: CreateWorkTagCategoryDto) {
    return 'This action adds a new workTagCategory';
  }

  findAll() {
    return `This action returns all workTagCategory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workTagCategory`;
  }

  update(id: number, updateWorkTagCategoryDto: UpdateWorkTagCategoryDto) {
    return `This action updates a #${id} workTagCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} workTagCategory`;
  }
}
