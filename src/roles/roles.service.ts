import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from './rol.entity';
import { Repository } from 'typeorm';
import { CreateRolDto } from './dto/create-rol.dto';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Rol)
        private readonly roleRepository: Repository<Rol>,
      ) {}
    
      // 🟢 Crear un rol
      async create(dto: CreateRolDto){
        
        const rolFound = await this.roleRepository.findOneBy({
            id: dto.id
        })
   
        const role = this.roleRepository.create(dto);
        
        return await this.roleRepository.save(role);
      }
    
      // 🔍 Buscar rol por nombre
      async findByName(name: string): Promise<Rol | null> {
        return await this.roleRepository.findOneBy({ name });

      }
    
      // 📋 Obtener todos los roles
      async findAll(): Promise<Rol[]> {
        return await this.roleRepository.find();
      }
    
   
}
