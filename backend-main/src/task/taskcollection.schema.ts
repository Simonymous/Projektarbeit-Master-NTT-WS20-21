import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskCollectionDocument = TaskCollection & Document;

@Schema()
export class TaskCollection {
  constructor(
    title: string,
    description: string,
    type:string,
    creator: string,
    tags: [],
    course: string,
    tasks: [],
  ) {}

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  type: string;

  @Prop()
  creator: string;

  @Prop()
  tags: [];

  @Prop()
  course: string;

  @Prop()
  date: Date;

  @Prop()
  tasks: [];

}

export const TaskCollectionSchema = SchemaFactory.createForClass(TaskCollection);