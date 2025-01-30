import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  name: string;
  @IsOptional()
  email: string;
  @IsOptional()
  phone: string;
  @IsOptional()
  address: string;
  @IsOptional()
  image: string;
  @IsOptional()
  role: string;
  accountType: string;
  isActive: string;
  codeId: string;
  codeExpired: Date;
}
