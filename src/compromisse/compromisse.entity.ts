import { User } from 'src/user/user.entity';
import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    CreateDateColumn,
    ManyToMany,
} from 'typeorm';


@Entity()
export class Compromisse {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({name: "day"})
    day: Date;

    @Column({name: "description"})
    description: string

    @Column({name: "local"})
    local: string

    @Column({name: "category"})
    category: string

    @Column({name: "email"})
    email: string

    @ManyToMany(() => User, user => user.rel_user_address)
    rel_compromisse_user: User[];
}