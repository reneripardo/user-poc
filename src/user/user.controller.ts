import { Body, Controller, createParamDecorator, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { CreateUserDto, CreateUserByAdminDto, SigninDto, IdFriendshipDto, CreateCompromiseDto, EmailDto } from "./dtos/dto";
import { UserService } from "./user.service";
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express'

export const User = createParamDecorator((data, req) => {
    return req.user;
});

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
    //@UseGuards(AuthGuard('jwt'))
    @Post(':id_user/signup')
    async create_user_by_admin(
        @Body() createUserByAdminDto: CreateUserByAdminDto, 
        @Param('id_user') id_user: string
        ) {
            return this.userService.createUserByAdminService(id_user, createUserByAdminDto);
    }

    //4.	Solicitação de amizade
    //@UseGuards(AuthGuard('jwt'))
    @Post(':id_user/friendship')
    async create_friendship(
        @Body() idFriendshipDto: IdFriendshipDto,
        @Param('id_user') id_user: string
        ) {
            return this.userService.createFriendship(id_user, idFriendshipDto);
        }
    
    //5.	Criar compromisso
    //@UseGuards(AuthGuard('jwt'))
    @Post(':id_user/compromise')
    async create_compromise(
        @Body() createCompromiseDto: CreateCompromiseDto,
        @Param('id_user') id_user: string
        ) {
            return this.userService.createCompromise(id_user, createCompromiseDto);
        }
    
        
    //7.	Obter dados do usuário
    //@UseGuards(AuthGuard('jwt'))
    @Get(':id_user/data-user')
    async data_user(@Param('id_user') id_user: string) {
        return this.userService.dataUser(id_user);
    }

    //8.	Obter compromissos
    //@UseGuards(AuthGuard('jwt'))
    @Get(':id_user/compromise')
    async compromise(@Param('id_user') id_user: string) {
        return this.userService.compromise(id_user);
    }


    @Post('send_email')
    async send_email(@Body() emailDto: EmailDto) {
        return this.userService.sendEmail(emailDto);
    }



}