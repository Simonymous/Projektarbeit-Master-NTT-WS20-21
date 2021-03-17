import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskCollectionController } from './taskcollection.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Task, TaskSchema } from './task.schema';
import { User, UserSchema } from '../users/user.schema';
import { TaskCollection, TaskCollectionSchema} from './taskcollection.schema'
import { APP_GUARD } from '@nestjs/core';
import { UsersService } from '../users/users.service'
@Module({
  imports: [MongooseModule.forFeature([{name: Task.name, schema: TaskSchema}]),
            MongooseModule.forFeature([{name: TaskCollection.name, schema: TaskCollectionSchema}]),
            MongooseModule.forFeature([{name: User.name, schema: UserSchema}])
           ],
  controllers: [TaskController, TaskCollectionController],
  providers: [TaskService]
})
export class TaskModule {}