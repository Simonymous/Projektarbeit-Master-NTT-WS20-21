import { Module } from '@nestjs/common';
import { CodetestController } from './codetest.controller';
@Module({
  imports: [],
  controllers: [CodetestController],
  providers: [],
  exports: []
})
export class CodeTestModule {}