import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkTagDto } from './create-work-tag.dto';

export class UpdateWorkTagDto extends PartialType(CreateWorkTagDto) {}
