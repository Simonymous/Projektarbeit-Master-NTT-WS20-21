import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
//import { TasksheetModule } from "./tasksheet/tasksheet.module"
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

const DBNAME = 'test'
const MONGODB_PATH = 'mongodb://root:example@mongo:27017/'+DBNAME+'?authSource=admin'
@Module({
  imports: [TaskModule, MongooseModule.forRoot(MONGODB_PATH), AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
