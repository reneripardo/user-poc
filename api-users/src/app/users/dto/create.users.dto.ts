import { IsNotEmpty, IsEmail, Matches } from 'class-validator'
import { messasgesHelper } from 'src/helps/messages.helps';
import { RegExHelper } from 'src/helps/regex.help';
export class CreateUsersDto {
    @IsNotEmpty()
    firstName: string;
    
    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Matches(RegExHelper.password, {message: messasgesHelper.PASSWORD_VALID}) //para regex gr3at@3wdsG
    password: string
}