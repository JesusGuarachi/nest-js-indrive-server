import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt/jwt.constants';
import { JwtStrategy } from './jwt/jwt.strategy';
import { Rol } from 'src/roles/rol.entity';
import { RolesService } from 'src/roles/roles.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Rol]),
  JwtModule.register({
    secret: jwtConstants.secret, // ⚠ cámbialo por un valor real (usa .env)
    signOptions: { expiresIn: '1h' }, // tiempo de expiración del token
  }),],
  providers: [AuthService,JwtStrategy, RolesService],
  controllers: [AuthController]
})
export class AuthModule {}
