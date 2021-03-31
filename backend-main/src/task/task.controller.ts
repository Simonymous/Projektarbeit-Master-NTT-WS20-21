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

  /**
   *
   * Creates a new Task
   *
   * @param res Response status with message and new task if it was created successfully
   * @param taskDTO task Data from Frontend
   * @returns res "
   */
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

  /**
   * Returns All Tasks as Array
   * @returns Array with All Tasks
   */
  @Get()
  getAllTasks() {
    return this.taskService.findAllTasks();
  }

  /**
   *
   * Returns Task Collections that use a given Task
   * @param taskID taskID to search in taskCollections
   * @returns Array of TaskCollections
   */
  @Get('/getTaskCollections/:id')
  async getTaskCollectionsForTask(@Param('id') taskID: string) {
    return await this.taskService.getTaskCollectionsForTask(taskID);
  }

  /**
   *
   * Returns a Specific Task
   *
   * @param taskID taskID to get
   * @param res response (not found or ok with task)
   * @returns res "
   */
  @Get(':id')
  async getTask(@Param('id') taskID: string, @Res() res) {
    const returnObj = await this.taskService.getSingleTask(taskID);
    if(returnObj) return res.status(HttpStatus.OK).json(returnObj);
    else return res.status(HttpStatus.NOT_FOUND).json({
      message: 'no Task found'
    })
  }

  // Wird nicht verwendet, ist trotzdem korrekt und als überbleibsel hier
  // Suche primär nach Tags und dann nach Name -> erhalte Searchstring
  @Post('/searchTask')
  async searchTask(@Res() res, @Body() searchQuery: any) {
    const returnObj = await this.taskService.searchTask(searchQuery);
    return res.status(HttpStatus.OK).json({
      message: 'Gefundene Tasks:',
      task: returnObj,
    });
  }

  /**
   *
   * Updates a given Task
   *
   * @param taskID task to update
   * @param taskDTO new task Data
   * @param res updated Task
   * @returns res "
   */
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

  /**
   *
   * Deletes a Task
   *
   * @param taskID task to delete
   * @param res status message and deleted task if deletion was successful
   * @returns res "
   */
  @Delete(':id')
  async deleteTask(@Param('id') taskID: string, @Res() res) {

    if(await this.taskService.deleteTask(taskID)) return res.status(HttpStatus.OK).json({
      message: 'deleted Task'
    });
    else return res.status(HttpStatus.NOT_FOUND).json({
      message: 'not deleted'
    });

  }

  /**
   *
   * Get Open Tests For given Task
   *
   * @param taskID TaskID
   * @param input userInput for Plugin
   * @param res status message and open tests if task is found
   * @returns res "
   */
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
      if(runnedTests) {
        return res.status(HttpStatus.OK).json(runnedTests);
      } else return res.status(HttpStatus.NOT_FOUND).json({
        message: 'Task not found!',
      });

    }

    return res.status(HttpStatus.NOT_FOUND).json({
      message: 'Task not found!',
    });
  }

  /**
   *
   * Submit a Task to moodle
   *
   * @param taskID task ID to submit
   * @param headers headers.authorization includes user token to access the moodle session internal
   * @param input userinput from plugin
   * @param res message and status
   * @returns res "
   */
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
      if(session && note) {
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
