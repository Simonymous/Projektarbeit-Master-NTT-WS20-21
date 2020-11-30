import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor( private usersService: UsersService,
               private jwtService: JwtService
              ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    //console.log(user)
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }


  async login(user: any) {    
    const validatedUser = await this.usersService.findOne(user.username)
    const payload = { username: validatedUser.username, sub: validatedUser._id.toString()};
    console.log(this.jwtService.decode( this.jwtService.sign(payload)))
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}