import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor( private usersService: UsersService,
               private jwtService: JwtService
              ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    //console.log(user)
    const dbPassword = await user.password;
    const matching = await bcrypt.compare(pass,dbPassword);
    if(matching) {
      return await user;
    }
    else return null;
  }


  async login(user: any) {    
    const validatedUser = await this.usersService.findOne(user.username)
    console.log(validatedUser)
    const payload = { username: validatedUser.username, sub: validatedUser.password};
    console.log(this.jwtService.decode( this.jwtService.sign(payload)))
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}