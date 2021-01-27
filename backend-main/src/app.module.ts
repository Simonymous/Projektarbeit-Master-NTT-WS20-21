import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirstquestionsModule } from './firstquestions/firstquestions.module';
import { TaskModule } from './task/task.module';
//import { TasksheetModule } from "./tasksheet/tasksheet.module"
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import {MoodleModule} from './moodle/moodle.module';
import { UsersModule } from './users/users.module';
import { CodeTestModule } from './code-test/codetest.module';

@Module({
  imports: [FirstquestionsModule, TaskModule, MongooseModule.forRoot('mongodb://root:example@mongo:27017/test?authSource=admin'), AuthModule, UsersModule, MoodleModule, CodeTestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
