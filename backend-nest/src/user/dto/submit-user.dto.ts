import { IsNotEmpty, IsString, Length } from 'class-validator';

export class SubmitUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 10)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(4, 4, { message: '비밀번호는 정확히 4자리여야 합니다.' })
  password: string;
}
