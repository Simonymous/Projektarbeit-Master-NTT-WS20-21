import { Controller, Post, Body, Get, Param, Patch, Delete, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from './users.service';
@Controller('user')
export class UsersController {

  constructor(private readonly usersService: UsersService) {}
    @Get()
    @UseGuards(JwtAuthGuard)
    getUser() {
      return {user: 'test', role:'test'}
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    getAllUsers() {
      return this.usersService.findAll();
    }

}