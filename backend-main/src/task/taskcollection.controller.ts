import { TaskService } from './task.service';
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Headers,
  Put,
  Delete,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { TaskCollection } from './taskcollection.schema';
import taskRunner from './taskrunner';
import moodleSessions from '../auth/moodleSessions';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import moodleSubmitHelper from './moodleSubmitHelper'

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
    @Param('taskID') taskID: string,
    @Headers() headers,
    @Body() submission: any,
    @Res() res
  ) {
    let task = await this.taskService.getSingleTask(taskID);
    if(task) {
      const authToken = headers.authorization;
      let mytaskrunner = new taskRunner();
      const note = await mytaskrunner.submitTask(task, submission);
      const sessions = moodleSessions.getInstance()
      const session = sessions.getSession(authToken)
      if(session) {
        let userId = session.body.user_id
        let userName = session.body.ext_user_username
        let userMail = session.body.lis_person_contact_email_primary
        this.taskService.markTaskInCollectionAsSubmitted(userMail,taskCollectionID,taskID,note)
        return res.status(HttpStatus.OK).json({
          message: 'Task submitted',
          feedback: "OK", //Placeholder for future submission Feedback support
        })
      } else {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          message: 'Session Error. Task not submitted',
        })
      }
    } else {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'Error. Task not found',
      })
    }
  }

  @Post('/submit/:id')
  async submit(
    @Param('id') taskCollectionID: string,
    @Headers() headers,
    @Res() res
  ) {
    const authToken = headers.authorization;
    const sessions = moodleSessions.getInstance()
    const session = sessions.getSession(authToken)
    if(session) {
      let userId = session.body.user_id
      let userName = session.body.ext_user_username
      let userMail = session.body.lis_person_contact_email_primary
      let submitHelper = new moodleSubmitHelper();
      const note = await this.taskService.getTaskCollectionNote(userMail,taskCollectionID)
      if(note) {
        let status = submitHelper.submitNoteToMoodle(session,note)
        this.taskService.markTaskOrCollectionAsSubmitted(userMail,taskCollectionID,note)
        return res.status(HttpStatus.OK).json({
          message: 'Task Collection submitted:',
          feedback: status,
        })
      } else {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          message: 'Session Error. Task not submitted',
        })
      }

    } else {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Session Error. Task not submitted',
      })
    }
  }

  @Get(':id')
  async getTaskCollection(@Param('id') taskCollectionID: string, @Res() res) {
    const returnObj = await this.taskService.getSingleTaskCollection(taskCollectionID)
    if(returnObj) return res.status(HttpStatus.OK).json(returnObj)
    else return res.status(HttpStatus.NOT_FOUND).json({
      message:"Task Collection not found"
    })

  }

  @Put('/update')
 async  updateTaskCollection(@Param('id') taskID: string, @Body() taskDTO: TaskCollection, @Res() res) {
    if(await this.taskService.updateTaskCollection(taskDTO)) return res.status(HttpStatus.OK).json({
      message: 'updatedTaskCollection'
    })
    else return res.status(HttpStatus.NOT_FOUND).json({
      message: 'not updated'
    })
  }

  @Delete(':id')
  async deleteTaskCollection(@Param('id') taskCollectionID: string, @Res() res) {
    if(await this.taskService.deleteTaskCollection(taskCollectionID)) return res.status(HttpStatus.OK).json({
      message: 'deleted TaskCollection'
    })
    else return res.status(HttpStatus.NOT_FOUND).json({
      message: 'not deleted'
    })
  }
}