import { IsOptional, IsNotEmpty, IsEmail } from 'class-validator'

export class UpdateUsersDto {
    @IsOptional()
    firstName: string;
    
    @IsOptional()
    lastName: string;

    @IsOptional()
    @IsEmail()
    email: string;
}