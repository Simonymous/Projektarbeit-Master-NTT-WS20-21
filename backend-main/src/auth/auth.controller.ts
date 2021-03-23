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
      if(returnObj) {return res.status(HttpStatus.OK).json({
        message: 'User logged In successful!',
        token: returnObj
      })} else {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'Could Not Login User',
        })
      }
      //return this.authService.login(userDTO)
    }

    @Post('/moodleLogin')
    async moodleLogin(
      @Req() request,
      @Res() response
    ) {
        const {name,userId,mail,token,taskId} = await this.authService.ltiSessionInitiate(request)

        const {moodleUser,solved} = await this.authService.loginMoodleUserAndGetTask(name,mail,taskId)

        if(solved) {
          return response.redirect('http://localhost:8080/solvefullscreen/alreadySubmitted')
        } else {
          return response.redirect('http://localhost:8080/solvefullscreen?exerciseId='+taskId+'&token='+token)
        }

      }

    @Post('/register')
    async register(    @Res() res,
    @Body() userDTO: UserDTO, ) {

        const returnObj = await this.usersService.create(userDTO);
        if(returnObj) {return res.status(HttpStatus.OK).json({
            message: 'User added successfully!',
            returnObj
          })
        } else {
          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: 'User not added!',
          })
        }
    }
}