export class FirstQuestionModel {
  constructor(
    //public id: string, 
    public question: string, 
    public tests: {hiddentest: string, opentest: string}
    ) {}
}