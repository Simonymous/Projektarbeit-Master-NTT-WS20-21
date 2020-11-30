import { FirstquestionsService } from './firstquestions.service';
import { FirstquestionsController } from './firstquestions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
//import { FirstQuestion } from './firstquestion.model';
import {FirstQuestion, FirstQuestionSchema} from './firstquestion.schema';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/auth/roles/roles.guard';
@Module({
  imports: [MongooseModule.forFeature([{name: FirstQuestion.name, schema: FirstQuestionSchema}])],
  controllers: [FirstquestionsController],
  providers: [  {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },FirstquestionsService]
})
export class FirstquestionsModule {}