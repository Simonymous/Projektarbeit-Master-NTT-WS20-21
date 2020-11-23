import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDTO } from './user.dto';
import { User,UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {

  }

  async create(userDto: UserDTO): Promise<User> {
    const createdUser = new this.userModel(userDto);
    return createdUser.save()
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({'username': username});
  }


}