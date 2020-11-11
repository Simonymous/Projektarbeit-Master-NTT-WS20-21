import { FirstquestionsService } from './firstquestions.service';
import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';


@Controller('firstquestions')
export class FirstquestionsController {
  constructor(private readonly firstquestionService: FirstquestionsService) {}

  @Post()
  addQuestion(
    @Body('question') questQuestion: string, 
    @Body('tests') testsQuestion: {hiddentest: string, opentest: string} 
  ) {
    const generateId = this.firstquestionService.insertFirstQuestion(questQuestion, testsQuestion);
    return {id: generateId};
  }

  @Get()
  getAllQuestions() {
    return this.firstquestionService.getFirstQuestions();
  }

  @Get(':id')
  getQuestion(@Param ('id') questionID: string) {
    return this.firstquestionService.getSingelQuestion(questionID);
  }

  @Patch(':id')
  updateQuestion(
    @Param ('id') questionID: string, 
    @Body('question') questQuestion: string, 
    @Body('tests') testsQuestion: {hiddentest: string, opentest: string}
    ) {
      this.firstquestionService.uptadeQuestion(questionID, questQuestion, testsQuestion)
      return 'updated'
    }

    @Delete(':id')
    deleteQuestion(@Param ('id') questionId: string) {
      this.firstquestionService.deleteQuestion(questionId);
      return 'deleted'
    }
}
