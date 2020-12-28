import { Module } from '@nestjs/common';
import { MoodleController } from './moodle.controller';
@Module({
  imports: [],
  controllers: [MoodleController],
  providers: []
})
export class MoodleModule {}