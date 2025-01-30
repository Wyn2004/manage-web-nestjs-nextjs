import { IsEmail, IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  phone: string;

  address: string;

  image: string;

  role: string;

  accountType: string;

  isActive: string;

  codeId: string;

  codeExpired: Date;
}
