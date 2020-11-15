import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FirstQuestionDocument = FirstQuestion & Document;

@Schema()
export class FirstQuestion {

  @Prop()
  name: string;

  @Prop()
  question: string;

  /**@Prop()
  tests: {
      hiddentest: string;
      opentest: string;
  };**/
}

export const FirstQuestionSchema = SchemaFactory.createForClass(FirstQuestion);