import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth-dto';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginAuthDto } from './dto/login-auth-dto';
import {compare} from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,

){}
    async create(user: RegisterAuthDto){
        const emailExist = await this.userRepository.findOneBy({ email:user.email })
        const phoneExist = await this.userRepository.findOneBy({ phone:user.phone })

        if(emailExist){
            return new HttpException('This email is already in use.', HttpStatus.CONFLICT )
        }

        if(phoneExist){
            return new HttpException('This phone is already in use.', HttpStatus.CONFLICT )
        }
        const newUser = await this.userRepository.create(user);
        const userSave = await this.userRepository.save(newUser);

        const payload = {id:userSave.id, name: userSave}
        const token = this.jwtService.sign(payload);
        const data ={
            userSave,
            token
        };
        delete data.userSave.password;
        return data;
    }
    async login(loginData: LoginAuthDto){
        const userFound = await this.userRepository.findOneBy({ email: loginData.email});
        if(!userFound){
            return new HttpException('This email is not exist', HttpStatus.NOT_FOUND )
        }

        const isPasswordValid = await compare(loginData.password, userFound.password);

        if(!isPasswordValid){
            return new HttpException('Invalid emal or password', HttpStatus.FORBIDDEN )
        }

        const payload = {id:userFound.id, name: userFound}
        const token = this.jwtService.sign(payload);
        const data ={
            userFound,
            token
        };
        delete data.userFound.password;
        return data;

    }
}
