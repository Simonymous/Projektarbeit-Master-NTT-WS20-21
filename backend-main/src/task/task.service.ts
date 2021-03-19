import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './task.schema';
import { User, UserDocument, taskAndNote } from '../users/user.schema';
import { TaskCollection, TaskCollectionDocument } from './taskcollection.schema'

@Injectable()
export class TaskService {
  constructor (
    @InjectModel('Task') private taskModel: Model<TaskDocument>,
    @InjectModel('TaskCollection') private taskCollectionModel: Model<TaskCollectionDocument>,
    @InjectModel('User') private userModel: Model<UserDocument>
  ) {}

  async createTask(taskDto: Task): Promise<Task> {
    console.log("[LOG] Creating New Task:",taskDto)
    const createdTask = new this.taskModel(taskDto);
    return createdTask.save();
  }

  async createCollection(taskCollectionDto: TaskCollection): Promise<TaskCollection> {
    console.log("[LOG] Creating New Task Collection:",taskCollectionDto)
    const createdTaskCollection = new this.taskCollectionModel(taskCollectionDto);
    return createdTaskCollection.save();
  }

  async findAllTasks(): Promise<Task[]> {
    console.log("[LOG] Getting all Tasks")
    return this.taskModel.find({}).exec();
  }

  async findAllTaskCollections(): Promise<TaskCollection[]> {
    console.log("[LOG] Getting all Task Collections")
    return this.taskCollectionModel.find({}).exec();
  }

  async getSingleTask(taskId: string): Promise<Task> {
    console.log("[LOG] Getting Task with ID:",taskId)
    if (taskId.match(/^[0-9a-fA-F]{24}$/)) {
      return this.taskModel.findById({'_id': taskId}).exec();
    } else {
      return null;
    }
  }

	//TODO: TaskCollection tasks[]title synchronisieren
  async getSingleTaskCollection(taskCollectionId: string): Promise<TaskCollection> {
    console.log("[LOG] Getting Task Collection with ID:",taskCollectionId)
    if (taskCollectionId.match(/^[0-9a-fA-F]{24}$/)) {
      return this.taskCollectionModel.findById({'_id': taskCollectionId}).exec();
    } else {
      return null;
    }
  }


  //TODO: SEARCH, UPDATE for task and taskcollection

  // Objekt mit 2 Arrays: Suche nach Tags und Suche nach Name: TODO: SearchByTag, SearchByName
  async searchTask(searchQuery: any):Promise<Task[]> {
    console.log("[LOG] Search Task with query",searchQuery);
    return this.taskModel.find({searchQuery}).exec();
  }

  async updateTask(taskDto: any): Promise<Task> {
    console.log("[LOG] Update Task ",taskDto)
    const taskID = taskDto._id
    let {_id, ...rest} = taskDto
    return this.taskModel.findOneAndUpdate({_id: taskID},{...rest}, {new:true})
  }

  async getTaskCollectionsForTask(taskId: string): Promise<TaskCollection[]> {
    console.log("[LOG] Finding TaskCollections for task ",taskId)
    const taskCollections = await this.findAllTaskCollections();
    let taskCollectionsFound:TaskCollection[] = []
    taskCollections.forEach(taskCollection => {
      const tasks = taskCollection.tasks
      tasks.forEach(task => {
        if(task._id === taskId) taskCollectionsFound.push(taskCollection)
      })
    })
    return taskCollectionsFound
  }

  private async deleteTasksInCollection(taskId) {
    const taskCollections = await this.findAllTaskCollections();
    taskCollections.forEach((taskCollection:any) => {
      const tasks = taskCollection.tasks
      const newTasksForCollection = []
      tasks.forEach(task => {
        if(!(task._id.toString() === taskId.toString())) newTasksForCollection.push(task)
      })
      if(tasks.length != newTasksForCollection.length) {
        let newTaskCollection = taskCollection
        newTaskCollection.tasks = newTasksForCollection;
        this.updateTaskCollection(newTaskCollection)
      }

    })
  }

  async updateTaskCollection(taskDto: any): Promise<TaskCollection> {
    console.log("[LOG] Update Task Collection",taskDto)
    const taskID = taskDto._id
    let {_id, ...rest} = taskDto
    return this.taskCollectionModel.findOneAndUpdate({_id: taskID},{...rest}, {new:true})
  }

  async deleteTask(taskId: string): Promise<Task> {
    if (taskId.match(/^[0-9a-fA-F]{24}$/)) {
      //Cleanup: Task in den vorkommenden Collections auch löschen
      this.deleteTasksInCollection(taskId)
      return this.taskModel.findByIdAndRemove(taskId).exec();
    } else {
      return null;
    }
  }

  async deleteTaskCollection(taskCollectionId: string): Promise<TaskCollection> {
    if (taskCollectionId.match(/^[0-9a-fA-F]{24}$/)) {
      return this.taskCollectionModel.findByIdAndRemove(taskCollectionId).exec();
    } else {
      return null;
    }
  }

  async getTaskCollectionNote(usermail:string,taskCollectionID:string):Promise<number> {
    return 0
  }

  async markTaskInCollectionAsSubmitted(usermail:string,taskCollectionID:string,taskID:string,note:number):Promise<User> {
    let moodleUser = await this.userModel.findOne({'email': usermail}).exec()
    if(moodleUser) {
      let solvedTasksInCollectionMap = moodleUser.solvedTasksInCollection
      let solvedTasksInCollection = []
      let taskAndNoteObj:taskAndNote = {taskID: taskID,note:note}
      if(solvedTasksInCollectionMap) {
        if(solvedTasksInCollectionMap.has(taskCollectionID)) {
          solvedTasksInCollection = solvedTasksInCollectionMap.get(taskCollectionID)
          let taskAlreadySubmittedFlag = false;
          solvedTasksInCollection.forEach(submittedTask => {
            if(submittedTask.taskID == taskID) { console.log("ALREADY SUBMITTED"); taskAlreadySubmittedFlag = true}
          })
          if(!taskAlreadySubmittedFlag) {
            solvedTasksInCollection.push(taskAndNoteObj)
            solvedTasksInCollectionMap.set(taskCollectionID,solvedTasksInCollection)
          }
        } else {
          solvedTasksInCollection.push(taskAndNoteObj)
          solvedTasksInCollectionMap.set(taskCollectionID,solvedTasksInCollection)
        }
      } else {
        solvedTasksInCollection.push(taskAndNoteObj)
        solvedTasksInCollectionMap = new Map([[taskCollectionID,solvedTasksInCollection]])
      }
      moodleUser.solvedTasksInCollection = solvedTasksInCollectionMap
      let {_id, ...rest} = moodleUser
      return this.userModel.findOneAndUpdate({'email': usermail},{...rest}, {new:true})
    } else return null

  }

  async markTaskOrCollectionAsSubmitted(usermail:string,taskOrCollectionId:string):Promise<User> {
    let moodleUser = await this.userModel.findOne({'email': usermail}).exec()
    if(moodleUser) {
      //Clean Up User Tasks In Collection Submitted
      let solvedTasksInCollection = moodleUser.solvedTasksInCollection
      if(solvedTasksInCollection && solvedTasksInCollection.has(taskOrCollectionId)) {
        solvedTasksInCollection.delete(taskOrCollectionId)
      }
      let tasksSolved = moodleUser.solvedTasksOrCollections
      tasksSolved.push(taskOrCollectionId)
      moodleUser.solvedTasksOrCollections = tasksSolved
      moodleUser.solvedTasksInCollection = solvedTasksInCollection
      //Filter id
      let {_id, ...rest} = moodleUser
      return this.userModel.findOneAndUpdate({'email': usermail},{...rest}, {new:true})
    } else return null

  }
}