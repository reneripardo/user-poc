import { Body, Controller, Param, Post } from "@nestjs/common";
import { CreateUserDto, CreateUserByAdminDto } from "./dtos/dto";
import { UserService } from "./user.service";

@Controller('api/v1')
export class UserController{
    constructor(private readonly userService: UserService){}

    //1.	cadastro
    @Post('signup')
    async create_user(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUserSeevice(createUserDto);
    }

    //2.	ADMIN cadastra usuário
    @Post(':id_user/signup')
    async create_user_by_admin(
        @Body() createUserByAdminDto: CreateUserByAdminDto, 
        @Param('id_user') id_user: string
    ) {
        return this.userService.createUserByAdminService(id_user, createUserByAdminDto);
    }
}