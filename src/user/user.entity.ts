import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    BeforeInsert,
} from 'typeorm';
import { hashSync } from 'bcrypt';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({name: 'name'})
    name: string;

    @Column({name: 'password'})
    password: string;

    @Column({name: 'email'})
    email: string;

    @Column({name: 'telephone'})
    telephone: string;

    @Column({name: 'is_active'})
    is_active: boolean;

    @Column({name: 'profile'})
    profile: string;

    @BeforeInsert() // faz hash antes do typeorm inserir no banco
    hashPassword(){
      this.password = hashSync(this.password, 10)
    }
}