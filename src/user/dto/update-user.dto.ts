import { IsEmail, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  login: string;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  password: string;
  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email: string;
}
