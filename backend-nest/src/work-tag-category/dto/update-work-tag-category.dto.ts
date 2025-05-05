import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkTagCategoryDto } from './create-work-tag-category.dto';

export class UpdateWorkTagCategoryDto extends PartialType(CreateWorkTagCategoryDto) {}
