import { AuthService } from './auth.service';
import { Controller, Post, Request, Body, Get, Param, Patch, Delete, Res, HttpStatus, UseGuards} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { UserDTO } from 'src/users/user.dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly usersService: UsersService) {}

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req, @Body() userDTO: UserDTO) {
      return this.authService.login(userDTO)
    }
  
    @Post('/register')
    async register(    @Res() res,
    @Body() userDTO: UserDTO, ) {
        
        const returnObj = await this.usersService.create(userDTO);
        return res.status(HttpStatus.OK).json({
            message: 'User added successful!',
            user: returnObj
          })
    }
}