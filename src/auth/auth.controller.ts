import { Controller, UseGuards, Request, Post, Body, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dtos/register.user.dto';
import { LocalAuthGuard } from './guards/local-auth.guards';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) { }
    
    @Post('register')
    async registerUser( @Body() body: RegisterUserDto ) {
        return this.authService.registerUser(body.email, body.username, body.password)
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() request, @Response() response) {
        const user = request.user
        const token = await this.authService.createJwtToken(user.id)
        response.setHeader("Set-Cookie", `jwt=${token}; HttpOnly`)
        return response.send(user)
    }

}
