import { BadRequestException, Body, Controller, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload-service';
import { JwstRolesGuard } from 'src/auth/jwt/jwt.roles.guard';
import { HasRoles } from 'src/auth/jwt/has-roles';
import { JwtRole } from 'src/auth/jwt/jwt-roles';


@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService,
        private uploadService:UploadService
    ){}

    @Post()
    create(@Body() user: CreateUserDto){
        return this.usersService.create(user);
    }

    @HasRoles(JwtRole.CLIENT)
    @UseGuards(JwtAuthGuard,JwstRolesGuard)
    @Get()
    findAll(){
      return this.usersService.findAll(); 
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(@Param('id') id: number, @Body() user: UpdateUserDto){
      return this.usersService.update(id, user); 
    }

    @Post('file/:id')
    @UseInterceptors(
      FileInterceptor('file', {
        fileFilter: (req, file, cb) => {
            if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
              return cb(new BadRequestException('Only images allowed!'), false);
            }
            cb(null, true);
          },
          limits: { fileSize: 5 * 1024 * 1024 } // 5MB
      }),
    )
    uploadFile(@Param('id') id: number,@UploadedFile() file: Express.Multer.File) {
      return this.usersService.updateWithImage(id, file);
    }
    
}


