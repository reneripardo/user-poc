import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    BeforeInsert,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { hashSync } from 'bcrypt';
import { Compromisse } from 'src/user/entities/compromisse.entity';
import { Address } from 'src/user/entities/address.entity';

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

    @ManyToMany(() => Compromisse, (compromisse) => compromisse.rel_compromisse_user)
    @JoinTable()
    rel_user_compromisse: Compromisse[];

    @ManyToMany(() => Address, (address) => address.rel_address_user)
    @JoinTable()
    rel_user_address: Address[];
}