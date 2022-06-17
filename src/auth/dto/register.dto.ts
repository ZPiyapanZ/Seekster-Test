import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  fullName: string;
  @IsNotEmpty()
  username: string;
  @IsString()
  password: string;
}
