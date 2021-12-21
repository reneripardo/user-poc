import { IsNotEmpty, IsEmail, Matches } from 'class-validator';
import { messasgesHelper } from "../helps/messages.helps";
import { RegExHelper } from "../helps/regex.help";


export class CreateUserDto {
    //@ApiProper
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @Matches(RegExHelper.password, {message: messasgesHelper.PASSWORD_VALID}) //para regex gr3at@3wdsG
    password: string

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    telephone: string;

    @IsNotEmpty()
    profile: string;

    @IsNotEmpty()
    street: string;

    @IsNotEmpty()
    district: string;

    @IsNotEmpty()
    cep: number;

    @IsNotEmpty()
    state: string;

    @IsNotEmpty()
    city: string;

    @IsNotEmpty()
    number: number;

    @IsNotEmpty()
    complement: string;
}

export class CreateUserByAdminDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
}

export class SigninDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Matches(RegExHelper.password, {message: messasgesHelper.PASSWORD_VALID}) //para regex gr3at@3wdsG
    password: string
}