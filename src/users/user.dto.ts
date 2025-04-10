import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

export class UserDTO {
  id: number;

  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsEmail()
  email: string;

  @IsEnum(["owner", "tenant", "admin"])
  role: "owner" | "tenant" | "admin";
}
