import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { compareSync } from 'bcrypt';
import { FindConditions, FindOneOptions, Repository } from "typeorm";
import { CreateUserByAdminDto, CreateUserDto, SigninDto } from "./dtos/dto";
import { Address } from "./entities/address.entity";
import { Compromisse } from "./entities/compromisse.entity";
import { User } from "./entities/user.entity";
import { messasgesHelper } from "./helps/messages.helps";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly user_entity: Repository<User>,
        @InjectRepository(Address)
        private readonly address_entity: Repository<Address>,
        //@InjectRepository(Compromisse)
        //private readonly compromisse_entity: Repository<Compromisse>
    ){}

    async createUserSeevice(data: CreateUserDto) {
        const user = await this.user_entity.create(data);
    
        const address = await this.address_entity.create(data);
        await this.address_entity.save(address);

        user.rel_user_address = address;
        address.rel_address_user = user;
        
        const user_save = await this.user_entity.save(user);

        return {
            "id": user_save.id,
            "name": user_save.name,
            "active": user_save.is_active,
            "createdAt": user_save.createdAt,
        }
      }

      async createUserByAdminService(id_user: string, data: CreateUserByAdminDto) {
        
        //verificar se usuario logado é admin 
        const user_unit = await this.user_entity.find({where: {id: id_user, profile: "admin"}});
        if(user_unit.length == 0){
            throw new NotFoundException(`Usuário ${id_user} não possui perfil admin.`);
        } 

        const user = await this.user_entity.create(data);
        user.password = "User@12345"; //para criar uma hash da senha
    
        const address = await this.address_entity.create();
        await this.address_entity.save(address);

        user.rel_user_address = address;
        address.rel_address_user = user;
        
        const user_save = await this.user_entity.save(user);

        return {
            "id": user_save.id,
            "name": user_save.name,
            "active": user_save.is_active,
            "createdAt": user_save.createdAt,
        }  
      }

    async signinService(data: SigninDto) {
        const email = data.email;
        const password = data.password;
        let user: User;
        try {
          user = await this.user_entity.findOneOrFail({ email });
        } catch (error) {
          throw new UnauthorizedException(messasgesHelper.PASSWORD_OR_EMAIL_INVALID);
        }
    
        const isPasswordValid = compareSync(password, user.password);
        if (!isPasswordValid) 
            throw new UnauthorizedException(messasgesHelper.PASSWORD_OR_EMAIL_INVALID);;

        const payload = { id: user.id, email: user.email };
        return {
            "id": user.id,
            "name": user.email,
            "token": "token"
        } 

      }

    async findOneOrFail(conditions: FindConditions<User>,options?: FindOneOptions<User>,) {
        try {
          return await this.user_entity.findOneOrFail(conditions, options);
        } catch (error) {
          throw new NotFoundException(error.message);
        }
      }


}
