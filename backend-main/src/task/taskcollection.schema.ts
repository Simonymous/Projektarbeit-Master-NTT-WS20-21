import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskCollectionDocument = TaskCollection & Document;

interface TaskInCollection {
  _id: string,
  weighting: number,
  taskName: string
}
@Schema()
export class TaskCollection {
  constructor(
    title: string,
    description: string,
    type:string,
    creator: string,
    tags: [],
    course: string,
    tasks: TaskInCollection[],
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
  tasks: TaskInCollection[];

}

export const TaskCollectionSchema = SchemaFactory.createForClass(TaskCollection);