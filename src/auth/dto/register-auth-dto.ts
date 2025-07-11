import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterAuthDto{
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;
  
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    lastname: string;
  
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @IsString()
    @IsOptional()
    @MaxLength(20)
    phone?: string;
  
    @IsString()
    @IsOptional()
    image?: string;
  
    @IsString()
    @IsNotEmpty()
    password: string;

    rolesIds: string[];
}