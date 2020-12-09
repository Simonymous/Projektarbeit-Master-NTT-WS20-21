import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import {Task, TaskSchema} from './task.schema';
import { APP_GUARD } from '@nestjs/core';
@Module({
  imports: [MongooseModule.forFeature([{name: Task.name, schema: TaskSchema}])],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule {}