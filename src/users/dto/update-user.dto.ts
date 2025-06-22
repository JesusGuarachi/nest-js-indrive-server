import {  IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateUserDto{
    @IsString()
    @IsOptional()
    @MaxLength(100)
    name: string;
  
    @IsString()
    @IsOptional()
    @MaxLength(100)
    lastname: string;
  
    @IsString()
    @IsOptional()
    @MaxLength(20)
    phone?: string;
  
    @IsString()
    @IsOptional()
    image?: string;

    @IsString()
    @IsOptional()
    notificationToken?: string;
  


}