import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CheckNicknameDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 10)
  name: string;

  @IsOptional()
  @IsInt()
  userId?: number;
}
