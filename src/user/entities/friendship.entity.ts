import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Friendship {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: "id_sender", default: null})
    id_sender: number

    @Column({name: "id_recipient", default: null})
    id_recipient: number

    @Column({name: "active", default: false})
    active: boolean

}