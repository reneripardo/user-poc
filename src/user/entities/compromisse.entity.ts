import { IsArray, MaxLength } from 'class-validator';
import { User } from 'src/user/entities/user.entity';
import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    CreateDateColumn,
    ManyToMany,
    ManyToOne,
    OneToMany,
    JoinColumn,
    JoinTable,
} from 'typeorm';

@Entity()
export class Compromisse {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({name: "day_Compromisse", default: null})
    day_compromisse: Date;

    @CreateDateColumn({name: "day_reminder", default: null})
    day_reminder: Date;

    @Column({name: "description", default: null})
    description: string

    @Column({name: "local", default: null})
    local: string

    @Column({name: "category", default: null})
    category: string

    @Column({name: "email", default: null})
    email: string

    @ManyToOne(() => User, user => user.rel_user_compromise)
    rel_compromise_user: User;
}