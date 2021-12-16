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
        const user = await this.user_entity.create(data);
    
        const address = await this.address_entity.create(data);
        await this.address_entity.save(address);

        user.rel_user_address = [address];
        address.rel_address_user = [user];
        
        const user_save = await this.user_entity.save(user);

        return {
            "id": user_save.id,
            "name": user_save.name,
            "active": user_save.is_active
        }
      }

}
