import { User } from 'src/user/entities/user.entity';
import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    CreateDateColumn,
    ManyToMany,
    ManyToOne,
    OneToMany,
} from 'typeorm';

@Entity()
export class Compromisse {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({name: "day", default: null})
    day: Date;

    @Column({name: "description", default: null})
    description: string

    @Column({name: "local", default: null})
    local: string

    @Column({name: "category", default: null})
    category: string

    @Column({name: "email", default: null})
    email: string

    @CreateDateColumn({ name: 'created_at' })
    createdAt: string;

    @ManyToOne(() => User, user => user.rel_user_address)
    rel_compromisse_user: User;
}