import { Controller, Post, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('api/v1')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('signin')
    //3.	Acessar conta
    async signin(@Req() req: any) {
      return await this.authService.signin(req.user);
    }
}