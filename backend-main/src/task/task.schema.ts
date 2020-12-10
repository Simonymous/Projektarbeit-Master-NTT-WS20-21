import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {

  @Prop()
  name: string;

  @Prop()
  category: string;

  @Prop()
  tasksheet: string;

  @Prop()
  title: string;

  @Prop()
  tags: [];

  @Prop()
  description: string;

  @Prop()
  solution: string;

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