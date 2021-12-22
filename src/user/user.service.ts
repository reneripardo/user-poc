import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { compareSync } from 'bcrypt';
import { FindConditions, FindOneOptions, Repository } from "typeorm";
import { CreateCompromiseDto, CreateUserByAdminDto, CreateUserDto, EmailDto, IdFriendshipDto, SigninDto } from "./dtos/dto";
import { Address } from "./entities/address.entity";
import { Compromisse } from "./entities/compromisse.entity";
import { User } from "./entities/user.entity";
import { messasgesHelper } from "./helps/messages.helps";
import { Friendship } from "./entities/friendship.entity";
import { SendGridService } from "@anchan828/nest-sendgrid";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly user_entity: Repository<User>,
        @InjectRepository(Address)
        private readonly address_entity: Repository<Address>,
        @InjectRepository(Compromisse)
        private readonly compromise_entity: Repository<Compromisse>,
        @InjectRepository(Friendship)
        private readonly friendship_entity: Repository<Friendship>,
        private readonly sendGrid: SendGridService
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

    async createFriendship(id_user: string, data: IdFriendshipDto) {
      if (id_user == String(data.id_friendship)) {
        throw new NotFoundException(`id_user igual id_friendship.`);
      }

      const userSender = await this.user_entity.find({where: {id: id_user}});
      if(userSender.length == 0){
          throw new NotFoundException(`Usuário ${id_user} não existe.`);
      }
      const userRecipient = await this.user_entity.find({where: {id: data.id_friendship}});
      if(userRecipient.length == 0){
        throw new NotFoundException(`Usuário ${data.id_friendship} não existe.`);
      }

      const friendship = await this.friendship_entity.create();
      friendship.id_sender = Number(id_user)
      friendship.id_recipient = data.id_friendship
      await this.friendship_entity.save(friendship);
      return friendship;
    }

    async createCompromise(id_user, data: CreateCompromiseDto) {
      const user = await this.user_entity.findOne({where: {id: id_user}});
      if(!user){
        throw new NotFoundException(`Usuário ${id_user} não existe.`);
      }
      const compromise = await this.compromise_entity.create(data);
      await this.compromise_entity.save(compromise);

      user.rel_user_compromise = [compromise]
      compromise.rel_compromise_user = user;
    
      await this.user_entity.save(user);

      return {
        "id": compromise.id,
        "day_compromisse": compromise.day_compromisse,
        "day_reminder": compromise.day_reminder,
        "description": compromise.description,
        "local": compromise.local,
        "category": compromise.category,
        "email": compromise.email
      }
    }

    async dataUser(id_user) {
      const user = await this.user_entity.findOne({
        where: {id: id_user}, 
        relations: ['rel_user_address']
      });
      if(!user){
        throw new NotFoundException(`Usuário ${id_user} não existe.`);
      }
      const address = user.rel_user_address

      return {
        "user": {
          "id": user.id,
          "name": user.name,
          "email": user.email,
          "telephone": user.telephone,
          "profile": user.profile
        },
        address
      }
    }

    async compromise(id_user) {
      const user = await this.user_entity.findOne({
        where: {id: id_user}, 
        relations: ['rel_user_compromise']
      });
      if(!user){
        throw new NotFoundException(`Usuário ${id_user} não existe.`);
      }
      const compromise = user.rel_user_compromise

      return compromise;
    }

    async sendEmail(data: EmailDto) {
      await this.sendGrid.send({
        to: data.email,
        from: process.env.FROM_EMAIL,
        subject: "Test Sending",
        text: "Nest.js",
        html: "<strong>and easy to do anywhere, even with Node.js</strong>",
      });
      
      return {}

    }

}
