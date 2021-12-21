import { Body, Controller, Param, Post, UseGuards } from "@nestjs/common";
import { CreateUserDto, CreateUserByAdminDto, SigninDto } from "./dtos/dto";
import { UserService } from "./user.service";
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1')
//@UseGuards(AuthGuard('jwt'))
export class UserController{
    constructor(private readonly userService: UserService){}

    //1.	cadastro
    @Post('signup')
    async create_user(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUserSeevice(createUserDto);
    }

    //2.	ADMIN cadastra usuário
    @UseGuards(AuthGuard('jwt'))
    @Post(':id_user/signup')
    async create_user_by_admin(
        @Body() createUserByAdminDto: CreateUserByAdminDto, 
        @Param('id_user') id_user: string
    ) {
        return this.userService.createUserByAdminService(id_user, createUserByAdminDto);
    }
    
}