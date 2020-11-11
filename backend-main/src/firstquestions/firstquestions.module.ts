import { FirstquestionsService } from './firstquestions.service';
import { FirstquestionsController } from './firstquestions.controller';
import { Module } from '@nestjs/common';
@Module({
  imports: [],
  controllers: [FirstquestionsController],
  providers: [FirstquestionsService]
})
export class FirstquestionsModule {}