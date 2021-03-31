import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User,UserSchema } from './user.schema';
import { UsersController } from './users.controller';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/auth/roles/roles.guard';


@Module({
  imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
  controllers: [UsersController],
  providers: [UsersService,   {
    provide: APP_GUARD,
    useClass: RolesGuard,
  }],
  exports: [UsersService],
})
export class UsersModule {}