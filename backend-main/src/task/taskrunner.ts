export default class taskRunner {
  constructor() {}

  public runTests(task:any):any {
    switch(task.plugin) {
        case "coding": return this.codingTests(task) 
    }
  }

  public submitTask(task:any):any {
      //Testen, Speichern, nach Moodle schreiben
      return "SUBMITTED"
  }

  private codingTests(task:any) {
    //Testen, Feedback geben
    return "SUCCESS"
  }
}