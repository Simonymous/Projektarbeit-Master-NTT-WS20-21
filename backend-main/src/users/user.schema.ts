import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export interface taskAndNote {
  taskID: string,
  note: number
}
@Schema()
export class User {

  @Prop()
  name: string;

  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  solvedTasksOrCollections: string[];

  //<TASKCOLLECTIONID,[TASKIDS...]
  @Prop()
  solvedTasksInCollection: Map<string,taskAndNote[]>;

  @Prop()
  role: string;

}

export const UserSchema = SchemaFactory.createForClass(User);