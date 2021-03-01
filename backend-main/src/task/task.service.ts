import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Task, TaskDocument} from './task.schema';
import {TaskCollection, TaskCollectionDocument } from './taskcollection.schema'

@Injectable()
export class TaskService {
  constructor (@InjectModel('Task') private taskModel: Model<TaskDocument>,
  @InjectModel('TaskCollection') private taskCollectionModel: Model<TaskCollectionDocument>) {}

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

  async getSingleTask(taskId: String): Promise<Task> {
    console.log("[LOG] Getting Task with ID:",taskId)
    if (taskId.match(/^[0-9a-fA-F]{24}$/)) {
      return this.taskModel.findById({'_id': taskId}).exec();
    } else {
      return null;
    }
  }

	//TODO: TaskCollection tasks[]title synchronisieren
  async getSingleTaskCollection(taskCollectionId: String): Promise<TaskCollection> {
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

  async updateTask(taskId: String, taskDto: Task): Promise<Task> {

    /**if(taskDto.title){
      return this.taskModel.findByIdAndUpdate(taskId,{'title': taskDto.title}).exec();
    }
    if(taskDto.tags){
      return this.taskModel.findByIdAndUpdate(taskId,{'tags': taskDto.tags}).exec();
    }
    if(taskDto.description){
      return this.taskModel.findByIdAndUpdate(taskId,{'description': taskDto.description}).exec();
    }
    if(taskDto.tests.hiddentests){
      return this.taskModel.findByIdAndUpdate(taskId,{'tests.hiddentest': taskDto.tests.hiddentests}).exec();
    }
    if(taskDto.tests.opentests){
      return this.taskModel.findByIdAndUpdate(taskId,{'tests.opentest': taskDto.tests.opentests}).exec();
    }
    if(taskDto.maxPoints){
      return this.taskModel.findByIdAndUpdate(taskId,{'maxPoints': taskDto.maxPoints}).exec();
    }
    if(taskDto.maxTime){
      return this.taskModel.findByIdAndUpdate(taskId,{'maxTime': taskDto.maxTime}).exec();
    }**/
    return this.taskModel.findOne();
  }

  async deleteTask(taskId: String): Promise<Task> {
    if (taskId.match(/^[0-9a-fA-F]{24}$/)) {
      return this.taskModel.findByIdAndRemove(taskId).exec();
    } else {
      return null;
    }
  }

  async deleteTaskCollection(taskCollectionId: String): Promise<TaskCollection> {
    if (taskCollectionId.match(/^[0-9a-fA-F]{24}$/)) {
      return this.taskCollectionModel.findByIdAndRemove(taskCollectionId).exec();
    } else {
      return null;
    }
  }
}