import { IsIn, IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 300)
  content: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 10)
  nickname: string;

  @IsNotEmpty()
  @IsString()
  @Length(4, 4)
  password: string;

  @IsNotEmpty()
  @IsNumber()
  commentableId: number;

  @IsNotEmpty()
  @IsIn(['work', 'board'])
  commentableType: 'work' | 'board';
}
