import { Controller, Post, Body, Get, Param, Patch, Put, Delete, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/auth/roles/role.enum';
import { Roles } from 'src/auth/roles/roles.decorator';
import { UserDTO } from './user.dto';
import { UsersService } from './users.service';
@Controller('user')
export class UsersController {

  constructor(private readonly usersService: UsersService) {}
    @Get()
    @UseGuards(JwtAuthGuard)
    @Roles(Role.Admin)
    getUser() {
      return {user: 'test', role:'test'}
    }

    @Get('/getUsers')
    @UseGuards(JwtAuthGuard)
    //@Roles(Role.User)
    getAllUsers() {
      return this.usersService.findAll();
    }

    @Put()
    async putUser(@Res() res,
    @Body() userDTO: UserDTO) {
      const returnObj = await this.usersService.put(userDTO)

      return returnObj;
    }

    @Get('/testUser')
    getTestUser() {
      return this.usersService.findOne('simon')
    }

}