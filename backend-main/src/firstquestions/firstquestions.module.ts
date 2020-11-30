import { FirstquestionsService } from './firstquestions.service';
import { FirstquestionsController } from './firstquestions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
//import { FirstQuestion } from './firstquestion.model';
import {FirstQuestion, FirstQuestionSchema} from './firstquestion.schema';
import { APP_GUARD } from '@nestjs/core';
@Module({
  imports: [MongooseModule.forFeature([{name: FirstQuestion.name, schema: FirstQuestionSchema}])],
  controllers: [FirstquestionsController],
  providers: [ FirstquestionsService]
})
export class FirstquestionsModule {}