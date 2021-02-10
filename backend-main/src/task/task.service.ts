import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Task, TaskDocument} from './task.schema';

@Injectable()
export class TaskService {
  constructor (@InjectModel('Task') private taskModel: Model<TaskDocument>) {}

  async create(taskDto: Task): Promise<Task> {
    const createdTask = new this.taskModel(taskDto);
    return createdTask.save();
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find({}).exec();
  }

  async getSingleTask(taskId: String): Promise<Task> {
    if (taskId.match(/^[0-9a-fA-F]{24}$/)) {
      return this.taskModel.findById({'_id': taskId}).exec();
    } else {
      return null;
    }
  }

  // Objekt mit 2 Arrays: Suche nach Tags und Suche nach Name: TODO: SearchByTag, SearchByName
  async searchTask(searchQuery: any):Promise<Task[]> {
    console.log("[LOG] Search Task with query");
    console.log(searchQuery)
    return this.taskModel.find({searchQuery}).exec();
  }

  async updateTask(taskId: String, taskDto: Task): Promise<Task> {
  
    if(taskDto.title){
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
    }
  }

  async deleteTask(taskId: String): Promise<Task> {
    if (taskId.match(/^[0-9a-fA-F]{24}$/)) {
      return this.taskModel.findByIdAndRemove(taskId).exec();
    } else {
      return null;
    }
  }
}