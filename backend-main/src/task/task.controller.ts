import { TaskService } from './task.service';
import { UsersService } from '../users/users.service'
import {
  Controller,
  Post,
  Body,
  Headers,
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
import moodleSessions from '../auth/moodleSessions'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import taskRunner from './taskrunner';
import moodleSubmitHelper from './moodleSubmitHelper'

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
    if (returnObj) {return res.status(HttpStatus.OK).json({
      message: 'Task created successfully!',
      task: returnObj,
    })} else return  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Could not create Task!',
    })
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
    else return res.status(HttpStatus.NOT_FOUND).json({
      message: 'no Task found'
    })
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
  async updateTask(
    @Param('id') taskID: string,
    @Body() taskDTO: Task,
    @Res() res
  ) {
    if(await this.taskService.updateTask(taskDTO)) return res.status(HttpStatus.OK).json({
      message: 'updated Task'
    });
    else return res.status(HttpStatus.NOT_MODIFIED).json({
      message: 'not deleted'
    });
  }

  @Delete(':id')
  async deleteTask(@Param('id') taskID: string, @Res() res) {

    if(await this.taskService.deleteTask(taskID)) return res.status(HttpStatus.OK).json({
      message: 'deleted Task'
    });
    else return res.status(HttpStatus.NOT_FOUND).json({
      message: 'not deleted'
    });

  }

  @Post('/test/:id')
  async getOpenTests(
    @Param('id') taskID: string,
    @Body() input: any,
    //@Headers() headers,
    @Res() res,
  ) {

    let task = await this.taskService.getSingleTask(taskID);
    if (task) {
      let mytaskrunner = new taskRunner();
      let runnedTests = await mytaskrunner.runTests(task, input);
      return res.status(HttpStatus.OK).json(runnedTests);
    }

    return res.status(HttpStatus.NOT_FOUND).json({
      message: 'Task not found!',
    });
  }

  @Post('/submit/:id')
  async submitTask(
    @Param('id') taskID: string,
    //@Param('token') token: string,
    @Headers() headers,
    @Body() input: any,
    @Res() res,
  ) {
    let task = await this.taskService.getSingleTask(taskID);
    if (task) {
      let mytaskrunner = new taskRunner();
      let authToken = headers.authorization;
      let note = await mytaskrunner.submitTask(task, input);
      //Taskergebnis an moodle senden
      const sessions = moodleSessions.getInstance()
      const session = sessions.getSession(authToken)
      if(session) {
        let userId = session.body.user_id
        let userName = session.body.ext_user_username
        let userMail = session.body.lis_person_contact_email_primary
        let submitHelper = new moodleSubmitHelper();
        let status = submitHelper.submitNoteToMoodle(session,note)
        this.taskService.markTaskOrCollectionAsSubmitted(userMail,taskID,note)
        return res.status(HttpStatus.OK).json({
          message: 'Task submitted:',
          feedback: status,
        });
      } else {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          message: 'Session Error. Task not submitted',
        });
      }

    }
    return res.status(HttpStatus.NOT_FOUND).json({
      message: 'Task not found!',
    });
  }
}
