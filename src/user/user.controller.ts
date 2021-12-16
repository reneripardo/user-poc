import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create.user.dto";
import { UserService } from "./user.service";

@Controller('api/v1')
export class UserController{
    constructor(private readonly userService: UserService){}

    @Post('signup')
    async create_user(@Body() createUserDto: CreateUserDto) {
        return await this.userService.create_user(createUserDto);
    }
}