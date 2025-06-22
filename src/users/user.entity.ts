import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
    ManyToMany,
    JoinTable,
  } from 'typeorm';
  import {hash} from "bcrypt"
import { Rol } from 'src/roles/rol.entity';
  @Entity('users')
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 100 })
    name: string;
  
    @Column({ length: 100 })
    lastname: string;
  
    @Column({ unique: true, length: 150 })
    email: string;
  
    @Column({ length: 20, nullable: true })
    phone: string;
  
    @Column({ nullable: true })
    image: string;
  
    @Column()
    password: string;

    @Column({name:'notification_token', nullable: true})
    notificationToken: string;
  
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
      @BeforeInsert()
      async hashPassword(){
        this.password = await hash( this.password, Number(process.env.HASH_SALT))
      }
      @JoinTable({
        name: 'user_has_roles',
        joinColumn: {
          name: 'user_id'
        },
        inverseJoinColumn:{
          name:'rol_id'
        }
      })
      @ManyToMany(() =>Rol, (rol)=> rol.users)
      roles: Rol[]
  }