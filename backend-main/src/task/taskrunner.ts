export default class taskRunner {
  constructor() {}

  public runTests(task:any,userInput:string):any {
    console.log("[LOG] Running Test for task")
    switch(task.plugin) {
        case "coding": return this.codingTests(task,userInput) 
        default: return "Failed Running"
    }
  }

  public submitTask(task:any,userInput:string):any {
    switch(task.plugin) {
      case "coding": return this.codingSubmit(userInput) 
      default: return "Failed Running"
    }
  }

  private codingTests(task:any,userInput:string) {
    let returnArgs = [];
    try {
      var safeEval = require('notevil')
      let testCases = task.tests.opentests
      let userFunction = safeEval.Function(...task.tests.functionsargs,userInput)
      testCases.forEach(function(test) {
          let currentoutput = userFunction.apply('sandbox',test.input)
          let testDescription = "EXPECT "+JSON.stringify(test.input)+" TO BE "+JSON.stringify(test.output)+"-> GETTING "+currentoutput
          if(currentoutput===test.output) {
              returnArgs.push(testDescription+"...PASSED")
          } else {
              returnArgs.push(testDescription+"...NOT PASSED")
          }
      })
    } catch(e) {
        console.log("Funktion konnte nicht erzeugt werden",e)
        returnArgs.push("Compile Error: "+e.message)
    }
    return returnArgs
  }

  private codingSubmit(task:any) {
    return "SUBMITTED"
  }
}