import { Controller } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserService } from "./user.service";


@Controller('api/v1/users')
export class UserController{
    constructor(private readonly userService: UserService){}

}