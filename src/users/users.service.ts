import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {User, UserDocument} from './users.schema'
import { use } from 'passport';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)private userModel: Model<UserDocument>
    ) { }
    
    async createUser(email: string, username: string, password: string) {
        let existingUser = await this.userModel.findOne({ email: email }).exec()
        if (existingUser) {
            throw new HttpException("User with email already exists", HttpStatus.BAD_REQUEST)
        }
        const user = await this.userModel.create({ email: email, username: username, password: password })
        user.save()
        return user
    }


    async getUserByEmail(email: string) {
        const user = await this.userModel.findOne({"email": email}).exec()
        if (!user) { 
            throw new HttpException("Invalid User", HttpStatus.NOT_FOUND)
        }
        return user
    }
}
