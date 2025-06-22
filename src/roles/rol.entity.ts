import { User } from 'src/users/user.entity';
import {
    Entity,
    Column,
    PrimaryColumn,
    ManyToMany,
  } from 'typeorm';
  
  @Entity('roles')
  export class Rol {
    @PrimaryColumn()
    id: string;

    @Column({ length: 100, unique: true })
    name: string;
  
    @Column({ length: 255, nullable: true })
    image: string;
  
    @Column({ nullable: true }) // puedes usar 'text' si guardas como string
    route: string;
  
    @Column({
        name: 'created_at',
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP',
      })
      createdAt: Date;
      
      @Column({
        name: 'updated_at',
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP'
      })
      updatedAt: Date;
   @ManyToMany(() =>User, (user)=> user.roles)
  users: User[]
    
  }