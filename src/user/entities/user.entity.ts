import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    BeforeInsert,
    ManyToMany,
    JoinTable,
    OneToMany,
    OneToOne,
    JoinColumn,
    CreateDateColumn,
} from 'typeorm';
import { hashSync } from 'bcrypt';
import { Compromisse } from 'src/user/entities/compromisse.entity';
import { Address } from 'src/user/entities/address.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({name: 'name', default: null})
    name: string;

    @Column({name: 'password', default: "User@12345"})
    password: string;

    @Column({name: 'email', default: null})
    email: string;

    @Column({name: 'telephone', default: null})
    telephone: string;

    @Column({name: 'is_active', default: false})
    is_active: boolean;

    @Column({name: 'profile', default: null})
    profile: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;

    @BeforeInsert() // faz hash antes do typeorm inserir no banco
    hashPassword(){
      this.password = hashSync(this.password, 10)
    }

    @OneToMany(() => Compromisse, compromisse => compromisse.rel_compromisse_user, {onDelete: 'CASCADE'})
    rel_user_compromisse: Compromisse[];

    @OneToOne(() => Address)
    @JoinColumn()
    rel_user_address: Address;
}