import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
const crypto = require('crypto')
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }
    
    async registerUser(email: string, username: string, password: string) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        return await this.usersService.createUser(email, username, hashedPassword)
    }


    async getValidatedUser(email: string, password) {
        const user = await this.usersService.getUserByEmail(email)
        let userHashedPassword = user.password
        const validPassword = await bcrypt.compare(password, userHashedPassword)
        if (validPassword) {
            return user
        }
        else {
            throw new HttpException("Invalid Credentials", HttpStatus.BAD_REQUEST)
        }
    }


    async createJwtToken(userId: any) {
        const payload = { userId: userId }
        const token = this.jwtService.sign(payload)
        return token
    }
}
