export default class testPlugin2 {

    public getOpenTests(input:any) {
        return "Open Test"
    }

    private codingTests(tests:any,userInput:string) {
        console.log("[LOG] Evaluating user input: ",userInput)
        let functionArgs= ['a','b']; //TODO: Ersetzen durch Args vom Frontend
        let returnArgs = []
        try {
          var safeEval = require('notevil')
          let userFunction = safeEval.Function(...functionArgs,userInput)
          tests.forEach(function(test) {
            let input = JSON.parse(test.input)
            let inputArray = []
            input.forEach(element => {
              if(element.a) {
                inputArray.push(element.a)
              } else {
                inputArray.push(element.b)
              }

            });
            let output = JSON.parse(test.output)
              let currentoutput = userFunction.apply('sandbox',inputArray)
              let testDescription = "EXPECT "+JSON.stringify(input)+" TO BE "+JSON.stringify(output)+"-> GETTING "+JSON.stringify(currentoutput)
              if(currentoutput===output) {
                  returnArgs.push(testDescription+"...PASSED")
              } else {
                  returnArgs.push(testDescription+"...NOT PASSED")
              }
          })
        } catch(e) {
            console.log("Funktion konnte nicht erzeugt werden",e)
            returnArgs.push("Compile Error: "+e.message)
        }
        console.log(returnArgs)
        return returnArgs
      }

      private codingSubmit(task:any) {
        return "SUBMITTED"
      }
}