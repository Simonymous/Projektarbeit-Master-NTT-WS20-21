import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor( private usersService: UsersService,
               private jwtService: JwtService
              ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const bcrypt = require('bcrypt');
    const user = await this.usersService.findOne(username);
    //console.log(user)
    if (user) {
      bcrypt.compare(pass, user.password, function(err, result) {
        if (result = true) {
          const { password, ...a } = user;
          return a;
        }

    });

    }
    return null;
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