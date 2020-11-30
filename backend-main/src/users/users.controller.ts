import { Controller, Post, Body, Get, Param, Patch, Delete, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Controller('user')
export class UsersController {


    @Get()
    @UseGuards(JwtAuthGuard)
    getUser() {
      return {user: 'test', role:'test'}
    }
}