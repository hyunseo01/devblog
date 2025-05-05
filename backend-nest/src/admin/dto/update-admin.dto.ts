import { PartialType } from '@nestjs/mapped-types';
import { SigninAdminDto } from './signin-admin.dto';

export class UpdateAdminDto extends PartialType(SigninAdminDto) {}
