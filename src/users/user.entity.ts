import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
  } from 'typeorm';
  import {hash} from "bcrypt"
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
  }