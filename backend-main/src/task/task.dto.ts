export class TaskDTO {
  constructor(
    public category: string,
    public tasksheet: string,
    public title: string,
    public tags: [],
    public description: string,
    public solution: string, 
    public tests: {hiddentest: [], opentest: []},
    public maxPoints: number,
    public maxTime: Date,
    ) {}
}