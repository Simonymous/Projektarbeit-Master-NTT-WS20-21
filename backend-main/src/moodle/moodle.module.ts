import { Module } from '@nestjs/common';
import { MoodleController } from './moodle.controller';
@Module({
  imports: [],
  controllers: [MoodleController],
  providers: [],
  exports: []
})
export class MoodleModule {}