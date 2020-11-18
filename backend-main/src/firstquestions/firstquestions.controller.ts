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
  ) {
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

  
  @Get(':id')
  async getQuestion(
    @Param ('id') questionID: string,
    @Res() res) {
    const returnObj = await this.firstquestionService.getSingleQuestion(questionID);
    return res.status(HttpStatus.OK).json({
      message: 'FirstQuestion gefunden!',
      firstQuestion: returnObj
    })
  }
  @Patch(':id')
  updateQuestion(
    @Param ('id') questionID: string, 
    @Body() firstQuestionDTO: FirstQuestionDTO, 
    ) {
      this.firstquestionService.updateQuestion(questionID, firstQuestionDTO)
      return 'updated'
    }
    @Delete(':id')
    deleteQuestion(@Param ('id') questionId: string) {
      this.firstquestionService.deleteQuestion(questionId);
      return 'deleted'
    }
}
