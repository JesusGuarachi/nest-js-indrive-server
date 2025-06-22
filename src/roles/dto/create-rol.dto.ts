import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateRolDto {
    @IsString()
    @IsNotEmpty()
    id: string;
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsString()
    @IsOptional()
    image?: string;
  
    @IsOptional()
    route?: any;
  }