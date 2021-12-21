import { Module } from "@nestjs/common";
import { UsersModule } from "src/user/user.module";
import { PassportModule } from '@nestjs/passport'
import { AuthService } from "./auth.service";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from "./auth.controller";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        UsersModule, 
        PassportModule,
        JwtModule.register({
            privateKey: process.env.JWT_SECRET_KEY,
            signOptions: { expiresIn: '300s'}
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService,  LocalStrategy, JwtStrategy] 
})
export class AuthModule {}