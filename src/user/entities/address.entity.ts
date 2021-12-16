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

    @Column({name: "street"})
    street: string

    @Column({name: "district"})
    district: string

    @Column({name: "cep"})
    cep: number

    @Column({name: "state"})
    state: string

    @Column({name: "city"})
    city: string

    @Column({name: "number"})
    number: string

    @Column({name: "complement"})
    complement: string

    @ManyToMany(() => Address, address => address.rel_address_user)
    rel_address_user: User[];
}