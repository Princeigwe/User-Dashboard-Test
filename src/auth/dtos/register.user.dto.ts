import { IsNotEmpty, IsString, IsEmail } from "class-validator"; 

export class RegisterUserDto{

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    @IsString()
    username: string

    @IsNotEmpty()
    @IsString()
    password: string
}