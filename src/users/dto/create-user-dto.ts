import {
    IsString,
    IsEmail,
    IsOptional,
    IsNotEmpty,
    MinLength,
    MaxLength,
  } from 'class-validator';
  
  export class CreateUserDto {
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
    @MinLength(6)
    password: string;
  }