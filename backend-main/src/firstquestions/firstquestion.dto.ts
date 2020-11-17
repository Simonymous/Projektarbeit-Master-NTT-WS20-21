export class FirstQuestionDTO {
  constructor(
    public question: string, 
    public tests: {hiddentest: string, opentest: string}
    ) {}
}