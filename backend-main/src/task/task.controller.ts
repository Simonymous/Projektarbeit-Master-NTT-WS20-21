import { TaskService } from './task.service';
import { Controller, Post, Body, Get, Param, Patch, Delete, Res, HttpStatus, UseGuards } from '@nestjs/common';
import {Task} from './task.schema';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import taskRunner from './taskrunner';


@Controller('task')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  //TODO: Funktioniert!! man muss nur aus dem Frontend das beim Login übermittelte Token mitschicken
  // https://stackoverflow.com/questions/44072750/how-to-send-basic-auth-with-axios ? ausprobieren..
  //@UseGuards(JwtAuthGuard)
  @Post()
  async createNewTask(
    @Res() res,
    @Body() taskDTO: Task,
  ) {
    const returnObj = await this.taskService.create(taskDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Task created successfully!',
      task: returnObj
    })
  }

  @Get()
  getAllTasks() {
    return this.taskService.findAll();
  }

  @Get(':id')
  async getTask(
    @Param('id') taskID: string,
    @Res() res) {
    console.log("Get Task")
    const returnObj = await this.taskService.getSingleTask(taskID);
    return res.status(HttpStatus.OK).json({
      message: 'Task gefunden!',
      task: returnObj
    })
  }

  // Suche primär nach Tags und dann nach Name -> erhalte Searchstring
  @Post('/searchTask')
  async searchTask(
    @Res() res, @Body() searchQuery: any,) {
    const returnObj = await this.taskService.searchTask(searchQuery);
    return res.status(HttpStatus.OK).json({
      message: 'Gefundene Tasks:',
      task: returnObj
    })
  }

  @Patch(':id')
  updateTask(
    @Param('id') taskID: string,
    @Body() taskDTO: Task,
  ) {
    this.taskService.updateTask(taskID, taskDTO)
    return 'updated'
  }
  @Delete(':id')
  deleteTask(@Param('id') taskID: string) {
    this.taskService.deleteTask(taskID);
    return 'deleted'
  }

  @Get('/getOpenTests')
  async getOpenTests(@Param('id') taskID: string, @Res() res) {
    let tasks = this.taskService.getSingleTask(taskID)
    let mytaskrunner = new taskRunner();
    let solutions = mytaskrunner.runTests(tasks);
    return res.status(HttpStatus.OK).json({
      message: 'Gefundene Tasks:',
      opentests : solutions
    })
  }

  @Post('/submitTask')
  async submitTask(@Body() submission:any, @Res() res) {
    let mytaskrunner = new taskRunner();
    let feedback = mytaskrunner.submitTask(submission);
    return res.status(HttpStatus.OK).json({
      message: 'Gefundene Tasks:',
      feedback: feedback
    })
  }
}
