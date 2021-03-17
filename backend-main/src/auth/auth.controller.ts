import { AuthService } from './auth.service';
import { Controller, Post, Request, Body, Get, Param, Patch, Delete, Res, HttpStatus, UseGuards, Req} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { UserDTO } from 'src/users/user.dto';
import { UsersService } from 'src/users/users.service';
import { timeStamp } from 'console';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly usersService: UsersService) {}

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Res() res, @Body() userDTO: UserDTO) {
      const returnObj = await this.authService.login(userDTO)
       res.cookie('session',returnObj)
      return res.status(HttpStatus.OK).json({
        message: 'User logged In successful!',
        token: returnObj
      })
      //return this.authService.login(userDTO)
    }

    @Post('/moodleLogin')
    async moodleLogin(
      @Req() request,
      @Res() response
    ) {
        const returnObj = await this.authService.moodleLogin(request);
        return response.redirect('http://localhost:8080/solvefullscreen?exerciseId='+returnObj.taskId+'&token='+returnObj.access_token)
      }

    @Post('/register')
    async register(    @Res() res,
    @Body() userDTO: UserDTO, ) {

        const returnObj = await this.usersService.create(userDTO);
        return res.status(HttpStatus.OK).json({
            message: 'User added successful!',
            returnObj
          })
    }
}