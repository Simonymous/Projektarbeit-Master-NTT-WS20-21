import { TaskService } from './task.service';
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Put,
  Delete,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { Task } from './task.schema';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import taskRunner from './taskrunner';

@Controller('task')
//@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  //TODO: Funktioniert!! man muss nur aus dem Frontend das beim Login übermittelte Token mitschicken
  // https://stackoverflow.com/questions/44072750/how-to-send-basic-auth-with-axios ? ausprobieren..
  //@UseGuards(JwtAuthGuard)
  @Post('/create')
  async createNewTask(@Res() res, @Body() taskDTO: Task) {

    const returnObj = await this.taskService.createTask(taskDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Task created successfully!',
      task: returnObj,
    });
  }

  @Get()
  getAllTasks() {
    return this.taskService.findAllTasks();
  }

  @Get('/getTaskCollections/:id')
  async getTaskCollectionsForTask(@Param('id') taskID: string) {
    return await this.taskService.getTaskCollectionsForTask(taskID);
  }

  @Get(':id')
  async getTask(@Param('id') taskID: string, @Res() res) {
    const returnObj = await this.taskService.getSingleTask(taskID);
    if(returnObj) return res.status(HttpStatus.OK).json(returnObj);
    else return res.status(HttpStatus.NOT_FOUND).json("")
  }

  // Suche primär nach Tags und dann nach Name -> erhalte Searchstring
  @Post('/searchTask')
  async searchTask(@Res() res, @Body() searchQuery: any) {
    const returnObj = await this.taskService.searchTask(searchQuery);
    return res.status(HttpStatus.OK).json({
      message: 'Gefundene Tasks:',
      task: returnObj,
    });
  }

  @Put('/update')
  updateTask(@Param('id') taskID: string, @Body() taskDTO: Task) {
    this.taskService.updateTask(taskDTO);
    return 'updated';
  }

  @Delete(':id')
  deleteTask(@Param('id') taskID: string) {
    this.taskService.deleteTask(taskID);
    return 'deleted';
  }

  @Post('/test/:id')
  async getOpenTests(
    @Param('id') taskID: string,
    @Body() taskinput: any,
    @Res() res,
  ) {
    let task = await this.taskService.getSingleTask(taskID);
    if (task) {
      let mytaskrunner = new taskRunner();
      let solutions = await mytaskrunner.runTests(task, taskinput.userInput);
      return res.status(HttpStatus.OK).json(solutions);
    }

    return res.status(HttpStatus.NOT_FOUND).json({
      message: 'Task not found!',
    });
  }

  @Post('/submit/:id')
  async submitTask(
    @Param('id') taskID: string,
    @Body() submission: any,
    @Res() res,
  ) {
    let task = await this.taskService.getSingleTask(taskID);
    if (task) {
      let mytaskrunner = new taskRunner();
      let feedback = await mytaskrunner.submitTask(task, submission.userinput);
      return res.status(HttpStatus.OK).json({
        message: 'Task übermittelt:',
        feedback: feedback,
      });
    }
    return res.status(HttpStatus.NOT_FOUND).json({
      message: 'Task not found!',
    });
  }
}
