import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth-dto';
import { LoginAuthDto } from './dto/login-auth-dto';

@Controller('auth')
export class AuthController {
    constructor(private service: AuthService){}

    @Post('register')
    create(@Body() user: RegisterAuthDto){
        return this.service.create(user);
    }

    @Post('login')
    login(@Body() user: LoginAuthDto){
        return this.service.login(user);
    }
}
