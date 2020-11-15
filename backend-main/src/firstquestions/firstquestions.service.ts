//import { FirstQuestion } from './firstquestion.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {FirstQuestion, FirstQuestionDocument} from './firstquestion.schema';

@Injectable()
export class FirstquestionsService {
  constructor (@InjectModel(FirstQuestion.name) private firstQuestionModel: Model<FirstQuestionDocument>) {}

  async create(firstQuestionDto: FirstQuestion): Promise<FirstQuestion> {
    
    const createdFirstQuestion = new this.firstQuestionModel(firstQuestionDto);
    return createdFirstQuestion.save();
  }

  async findAll(): Promise<FirstQuestion[]> {
    return this.firstQuestionModel.find().exec();
  }

  /**private firstquestions: FirstQuestion[] = []; 

  insertFirstQuestion(question: string, tests: {hiddentest: string, opentest: string}) {
    const questionID = Math.random().toString();
    const newQuestion = new FirstQuestion(questionID, question, tests);
    this.firstquestions.push(newQuestion);
    return questionID;
  }

  getFirstQuestions() {
    return [...this.firstquestions];
  }

  getSingleQuestion(questionId: string) {
    const quest = this.findeQuestion(questionId)[0];
    return { ...quest };
  }

  updateQuestion(questionId: string, question: string, tests: {hiddentest: string, opentest: string} ) {
    const [quest, index] = this.findeQuestion(questionId);
    const updatedQuest = {...quest};
    if(question){
      updatedQuest.question = question;
    }
    if(tests){
      updatedQuest.tests.hiddentest = tests.hiddentest;
      updatedQuest.tests.opentest = tests.opentest;
    }
    this.firstquestions[index] = updatedQuest;
  }

  deleteQuestion(questionId: string) {
    const [_, index] = this.findeQuestion(questionId);
    this.firstquestions.splice(index, 1);
  }

  private findeQuestion(questionId: string): [FirstQuestion, number] {
    const questionIndex = this.firstquestions.findIndex((quest) => quest.id === questionId);
    const question = this.firstquestions[questionIndex];
    if(!question){
      throw new NotFoundException('Could nor finde Question');
    }
    return [question, questionIndex];
  }**/
}