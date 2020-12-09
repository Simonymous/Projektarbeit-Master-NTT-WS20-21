import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDTO } from './user.dto';
import { User,UserDocument } from './user.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {

  }

  async put(userDto: UserDTO) {
    console.log("[LOG] Put User:")
    console.log(userDto)
    return this.userModel.findByIdAndUpdate(userDto._id,{'username':userDto.username, 'email':userDto.email, 'role':userDto.role}).exec(); //TODO: testn
  }

  //TODO: Check old Password??
  async changePassword(userDto: UserDTO) {
    var password = userDto.password;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password,saltRounds);
    userDto.password = await hashedPassword;
    console.log("[LOG] Change Password User:");
    console.log(userDto);
    return this.userModel.findByIdAndUpdate(userDto._id,{'password': userDto.password}).exec();
  }

  async create(userDto: UserDTO): Promise<User> {

    var that = this;
    var password = userDto.password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password,saltRounds);
    userDto.password = await hashedPassword;
    userDto.role = "user"; //Erstmal User by default
    console.log("[LOG] Save new User")
    console.log(userDto)
    const createdUser = await new that.userModel(userDto);
    return createdUser.save()
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({'username': username}).exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

}