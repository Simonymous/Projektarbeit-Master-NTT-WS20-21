//import { FirstQuestion } from './firstquestion.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { runInThisContext } from 'vm';
import { FirstQuestionDTO } from './firstquestion.dto';
import {FirstQuestion, FirstQuestionDocument} from './firstquestion.schema';

@Injectable()
export class FirstquestionsService {
  constructor (@InjectModel('FirstQuestion') private firstQuestionModel: Model<FirstQuestionDocument>) {}

  async create(firstQuestionDto: FirstQuestionDTO): Promise<FirstQuestion> {
    
    const createdFirstQuestion = new this.firstQuestionModel(firstQuestionDto);
    return createdFirstQuestion.save();
  }

  async findAll(): Promise<FirstQuestion[]> {
    return this.firstQuestionModel.find().exec();
  }

  async getSingleQuestion(questionId: String): Promise<FirstQuestion> {
    if (questionId.match(/^[0-9a-fA-F]{24}$/)) {
      return this.firstQuestionModel.findById({'_id': questionId}).exec();
    } else {
      return null;
    }
  }

  async updateQuestion(questionId: String, firstQuestionDto: FirstQuestionDTO): Promise<FirstQuestion> {
    
    if(firstQuestionDto.question){
      return this.firstQuestionModel.findByIdAndUpdate(questionId,{'question': firstQuestionDto.question}).exec();
    }
    if(firstQuestionDto.tests.hiddentest){
      return this.firstQuestionModel.findByIdAndUpdate(questionId,{'tests.hiddentest': firstQuestionDto.tests.hiddentest}).exec();
    }
    if(firstQuestionDto.tests.opentest){
      return this.firstQuestionModel.findByIdAndUpdate(questionId,{'tests.opentest': firstQuestionDto.tests.opentest}).exec();
    }
  }

  async deleteQuestion(questionId: String): Promise<FirstQuestion> {
    if (questionId.match(/^[0-9a-fA-F]{24}$/)) {
      return this.firstQuestionModel.findByIdAndRemove(questionId).exec();
    } else {
      return null;
    }
  }
}