import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dtos/create.user.dto";
import { Address } from "./entities/address.entity";
import { Compromisse } from "./entities/compromisse.entity";
import { User } from "./entities/user.entity";


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly user_entity: Repository<User>,
        @InjectRepository(Address)
        private readonly address_entity: Repository<Address>,
        @InjectRepository(Compromisse)
        private readonly compromisse_entity: Repository<Compromisse>
    ){}

    async create_user(data: CreateUserDto) {
        const user = this.user_entity.create(data);
        this.user_entity.save(user);
        
        return await {
            "id": user?.id, 
            "name": user?.name, 
            "active": user?.is_active 
        }
      }


}
