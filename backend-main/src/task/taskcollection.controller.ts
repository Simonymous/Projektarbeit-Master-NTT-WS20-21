import { TaskService } from './task.service';
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
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

  @Post('/submitTask/:taskcollectionID/:taskID')
  async submitTaskInCollection(
    @Param('taskcollectionID') taskCollectionID: string,
    @Param('taskID') taskID: string
  ) {
    console.log("TASK IN COLLECTION SUBMITTED",taskCollectionID,taskID)
  }

  @Post('/submit/:id')
  async submit(@Param('id') taskCollectionID: string) {
    console.log("SUBMITTED",taskCollectionID)
  }

  @Get(':id')
  async getTaskCollection(@Param('id') taskCollectionID: string, @Res() res) {
    const returnObj = await this.taskService.getSingleTaskCollection(taskCollectionID);
    if(returnObj) return res.status(HttpStatus.OK).json(returnObj);
    else return res.status(HttpStatus.NOT_FOUND).json("")

  }

  @Put('/update')
  updateTaskCollection(@Param('id') taskID: string, @Body() taskDTO: TaskCollection) {
    this.taskService.updateTaskCollection(taskDTO);
    return 'updated';
  }

  @Delete(':id')
  deleteTaskCollection(@Param('id') taskID: string) {
    this.taskService.deleteTaskCollection(taskID);
    return 'deleted';
  }
}