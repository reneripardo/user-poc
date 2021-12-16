import { User } from 'src/user/entities/user.entity';
import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    ManyToMany,
} from 'typeorm';

@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: "street", default: null})
    street: string

    @Column({name: "district", default: null})
    district: string

    @Column({name: "cep", default: null})
    cep: number

    @Column({name: "state", default: null})
    state: string

    @Column({name: "city", default: null})
    city: string

    @Column({name: "number", default: null})
    number: number

    @Column({name: "complement", default: null})
    complement: string

    @ManyToMany(() => Address, address => address.rel_address_user)
    rel_address_user: User[];
}