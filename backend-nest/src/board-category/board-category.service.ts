import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardCategory } from './entities/board-category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardCategoryService {
  constructor(
    @InjectRepository(BoardCategory)
    private readonly repo: Repository<BoardCategory>,
  ) {}

  findAll() {
    return this.repo.find({
      order: { id: 'ASC' },
    });
  }
}
