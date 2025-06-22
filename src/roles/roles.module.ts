import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Rol } from './rol.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,Rol])],
  providers: [RolesService],
  controllers: [RolesController]
})
export class RolesModule {}
