import { IsDate, IsEmail, IsEnum, IsPhoneNumber, IsString, IsStrongPassword, IsOptional } from 'class-validator';
import { Hash } from 'crypto';

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
  phoneNumber?: string;

  @IsStrongPassword()
  password: Hash;

  @IsEnum(["owner", "tenant", "admin"])
  role: "owner" | "tenant" | "admin";

  // Géré par Prisma : ne sera pas présent dans le Body des POST ou PATCH
  @IsDate()
  createdAt: string;
  
  // Géré par Prisma : ne sera pas présent dans le Body des POST ou PATCH
  @IsDate()
  updatedAt: string;
}
