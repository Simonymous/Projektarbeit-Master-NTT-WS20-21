import { FirstquestionsService } from './firstquestions.service';
import { Controller, Post, Body, Get, Param, Patch, Delete, Res, HttpStatus } from '@nestjs/common';
import { FirstQuestion } from './firstquestion.schema';
import { FirstQuestionDTO } from './firstquestion.dto';


@Controller('firstquestions')
export class FirstquestionsController {
  constructor(private readonly firstquestionService: FirstquestionsService) {}

  @Post()
  async addQuestion(
    @Res() res,
    @Body() firstQuestionDTO: FirstQuestionDTO, 
    //@Body('tests') testsQuestion: {hiddentest: string, opentest: string} 
  ) {
    //const createFirstQuestionDto = new CreateFirstQuestionDto(questQuestion/**,testsQuestion.hiddentest,testsQuestion.opentest*/);
    //const firstQuestion = new FirstQuestion();
    //TODO: Body To String?????
    //firstQuestion.question = String(questQuestion);
    //firstQuestion.tests = testsQuestion;
    const returnObj = await this.firstquestionService.create(firstQuestionDTO);
    return res.status(HttpStatus.OK).json({
      message: 'FirstQuestion erfolgreich hinzugefügt!',
      firstQuestion: returnObj
    })
  }

  @Get()
  getAllQuestions() {
    return this.firstquestionService.findAll();
  }

  /** 
  @Get(':id')
  getQuestion(@Param ('id') questionID: string) {
    return this.firstquestionService.getSingleQuestion(questionID);
  }

  @Patch(':id')
  updateQuestion(
    @Param ('id') questionID: string, 
    @Body('question') questQuestion: string, 
    @Body('tests') testsQuestion: {hiddentest: string, opentest: string}
    ) {
      this.firstquestionService.updateQuestion(questionID, questQuestion, testsQuestion)
      return 'updated'
    }

    @Delete(':id')
    deleteQuestion(@Param ('id') questionId: string) {
      this.firstquestionService.deleteQuestion(questionId);
      return 'deleted'
    }*/
}
