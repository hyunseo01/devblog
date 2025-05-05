import { Injectable } from '@nestjs/common';
import { CreateWorkTagDto } from './dto/create-work-tag.dto';
import { UpdateWorkTagDto } from './dto/update-work-tag.dto';

@Injectable()
export class WorkTagService {
  create(createWorkTagDto: CreateWorkTagDto) {
    return 'This action adds a new workTag';
  }

  findAll() {
    return `This action returns all workTag`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workTag`;
  }

  update(id: number, updateWorkTagDto: UpdateWorkTagDto) {
    return `This action updates a #${id} workTag`;
  }

  remove(id: number) {
    return `This action removes a #${id} workTag`;
  }
}
