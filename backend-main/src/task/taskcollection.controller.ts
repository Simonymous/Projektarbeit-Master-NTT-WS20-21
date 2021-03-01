import { TaskService } from './task.service';
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { TaskCollection } from './taskcollection.schema';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('taskcollection')
//@UseGuards(JwtAuthGuard)
export class TaskCollectionController {
  constructor(private readonly taskService: TaskService) {}

  //TODO: Funktioniert!! man muss nur aus dem Frontend das beim Login übermittelte Token mitschicken
  // https://stackoverflow.com/questions/44072750/how-to-send-basic-auth-with-axios ? ausprobieren..
  //@UseGuards(JwtAuthGuard)

  @Post('/create')
  async createNewTaskCollection(@Res() res, @Body() taskCollectionDTO: TaskCollection) {
    const returnObj = await this.taskService.createCollection(taskCollectionDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Task created successfully!',
      task: returnObj,
    });
  }

  @Get()
  getAllTaskCollections() {
    return this.taskService.findAllTaskCollections();
  }

  @Get(':id')
  async getTaskCollection(@Param('id') taskID: string, @Res() res) {
    const returnObj = await this.taskService.getSingleTaskCollection(taskID);
    return res.status(HttpStatus.OK).json(returnObj);
  }


  @Delete(':id')
  deleteTaskCollection(@Param('id') taskID: string) {
    this.taskService.deleteTaskCollection(taskID);
    return 'deleted';
  }
}