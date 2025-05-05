import { IsNotEmpty, IsString } from 'class-validator';

export class SigninAdminDto {
  @IsNotEmpty()
  @IsString()
  adminId: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
