import { FirstQuestion } from './firstquestion.model';
import { Injectable, NotFoundException } from '@nestjs/common';


@Injectable()
export class FirstquestionsService {
  private firstquestions: FirstQuestion[] = []; 

  insertFirstQuestion(question: string, tests: {hiddentest: string, opentest: string}) {
    const questionID = Math.random().toString();
    const newQuestion = new FirstQuestion(questionID, question, tests);
    this.firstquestions.push(newQuestion);
    return questionID;
  }

  getFirstQuestions() {
    return [...this.firstquestions];
  }

  getSingelQuestion(questionId: string) {
    const quest = this.findeQuestion(questionId)[0];
    return { ...quest };
  }

  uptadeQuestion(questionId: string, question: string, tests: {hiddentest: string, opentest: string} ) {
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
  }
}