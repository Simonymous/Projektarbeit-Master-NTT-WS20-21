import { Controller, Post, Body, Get, Param, Patch, Delete, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/auth/roles/role.enum';
import { Roles } from 'src/auth/roles/roles.decorator';
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

    @Get('/testUser')
    getTestUser() {
      return this.usersService.findOne('simon')
    }

}