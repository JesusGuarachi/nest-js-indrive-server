import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}

    @Post()
    create(@Body() user: CreateUserDto){
        return this.usersService.create(user);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(){
      return this.usersService.findAll(); 
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(@Param('id') id: number, @Body() user: UpdateUserDto){
      return this.usersService.update(id, user); 
    }
}
