import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth-dto';
import { In, Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginAuthDto } from './dto/login-auth-dto';
import {compare} from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Rol } from 'src/roles/rol.entity';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Rol) private rolesRepository: Repository<Rol>

){}
    async create(user: RegisterAuthDto){
        const emailExist = await this.userRepository.findOneBy({ email:user.email })
        const phoneExist = await this.userRepository.findOneBy({ phone:user.phone })
       
        if(emailExist){
            throw new HttpException('This email is already in use.', HttpStatus.CONFLICT )
        }

        if(phoneExist){
            throw new HttpException('This phone is already in use.', HttpStatus.CONFLICT )
        }

        const newUser = await this.userRepository.create(user);
       
        let roles=[];
        if(!user.rolesIds){
          roles.push('CLIENT')
        }
        else{
            roles = user.rolesIds;
        }

    
         roles = await this.rolesRepository.findBy({
            id: In(roles)
        });
        newUser.roles = roles;
        const userSave = await this.userRepository.save(newUser);
        const rolesId = userSave.roles.map(rol => rol.id);

        const payload = {id:userSave.id, name: userSave, roles: rolesId}
        const token = this.jwtService.sign(payload);
        const data ={
            userSave,
            token
        };
        delete data.userSave.password;
        return data;
    }
    async login(loginData: LoginAuthDto){
        const userFound = await this.userRepository.findOne({
            where: {email: loginData.email},
            relations: ['roles']
            });
        if(!userFound){
            throw new HttpException('This email is not exist', HttpStatus.NOT_FOUND )
        }

        const isPasswordValid = await compare(loginData.password, userFound.password);

        if(!isPasswordValid){
            throw new HttpException('Invalid emal or password', HttpStatus.FORBIDDEN )
        }

        const rolesId = userFound.roles.map(rol => rol.id);
        const payload = {id:userFound.id, name: userFound, roles: rolesId};
        const token = this.jwtService.sign(payload);
        const data ={
            user: userFound,
            token,
        };
        delete data.user.password;
        return data;

    }
}
