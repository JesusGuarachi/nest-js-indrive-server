import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { console } from 'inspector';
import { join } from 'path';
import { writeFile } from 'fs/promises';
import { Rol } from 'src/roles/rol.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>){}
    create(user: CreateUserDto){
        const newUser = this.userRepository.create(user);
        return this.userRepository.save(newUser);
    }

    findAll(){
        return this.userRepository.find({relations: ['roles']});
    }

    update(id:number,user: UpdateUserDto){
        const logger = new Logger('Bootstrap'); // nombre opcional

        const userFound = this.userRepository.findOneBy({id: id});
        if(!userFound){
            return new HttpException('This user not exist', HttpStatus.NOT_FOUND);
        
        }
        logger.log('Aplicación iniciada', userFound); 
        console.log(userFound);
       const updatedUser = Object.assign(userFound, user);
       console.log(updatedUser);

         this.userRepository.update(id,updatedUser);
         return this.userRepository.findOneBy({id: id});
    }

    async updateWithImage(id:number, file: Express.Multer.File){
        const logger = new Logger('Bootstrap'); // nombre opcional

        const userFound =  await this.userRepository.findOneBy({id: id});
        if(!userFound){
            return new HttpException('This user not exist', HttpStatus.NOT_FOUND);
        
        }
        const filename = `${Date.now()}-${file.originalname}`;
        const path = join(__dirname, '../../uploads', filename);
        await writeFile(path, file.buffer);
        userFound.image = path
    
         this.userRepository.update(id,userFound);
         return this.userRepository.findOneBy({id: id});
    }

}
