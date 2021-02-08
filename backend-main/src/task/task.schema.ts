import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  constructor(
    title: string,
    description: string,
    content: string,
    creator: string,
    tags: [],
    course: string,
    plugin: string,
    tests: {
        hiddentest: [];
        opentest: [];
    },
  ) {}

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  content: string;

  @Prop()
  creator: string;

  @Prop()
  tags: [];

  @Prop()
  course: string;

  @Prop()
  plugin: string;
  
  @Prop()
  tests: {
      hiddentest: [];
      opentest: [];
  };

  @Prop()
  maxPoints: number;

  @Prop()
  maxTime: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);