import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirstquestionsModule } from './firstquestions/firstquestions.module';

@Module({
  imports: [FirstquestionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
