import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsEnum, IsPhoneNumber, IsString, IsStrongPassword, IsOptional, IsDate } from 'class-validator';

export class UserDTO {
  @Expose()
  id: number;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  surname: string;

  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsOptional()
  @IsPhoneNumber()
  phoneNumber?: string | null;

  @Expose()
  @IsStrongPassword()
  password: string;

  @Expose()
  @IsEnum(["owner", "tenant", "admin"])
  role?: "owner" | "tenant" | "admin";

  // Géré par Prisma : ne sera pas présent dans le Body des POST ou PATCH
  @Exclude()
  @IsDate()
  createdAt: Date;

  // Géré par Prisma : ne sera pas présent dans le Body des POST ou PATCH
  @Exclude()
  @IsDate()
  updatedAt: Date;
}