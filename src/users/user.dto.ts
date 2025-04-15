import { Exclude } from 'class-transformer';
import { IsEmail, IsEnum, IsPhoneNumber, IsString, IsStrongPassword, IsOptional, IsDate } from 'class-validator';

export class UserDTO {
  id: number;

  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsPhoneNumber()
  phoneNumber?: string | null;

  @IsStrongPassword()
  password: string;

  @IsEnum(["owner", "tenant", "admin"])
  role: "owner" | "tenant" | "admin";

  // Géré par Prisma : ne sera pas présent dans le Body des POST ou PATCH
  @Exclude()
  @IsDate()
  createdAt: Date;

  // Géré par Prisma : ne sera pas présent dans le Body des POST ou PATCH
  @Exclude()
  @IsDate()
  updatedAt: Date;
}