    //@param data : dataForPlugin from Task
    //@param tests : open tests
    function getOpenTests(data:any,tests:any,input:any) {
        return codingTests(data.inputParams,tests,input)
    }

    function submit(data:any,tests:any,input:any) {
        console.log(tests)
        return "Submitted: "+input
    }

    function codingTests(inputparams:string[],tests:any[],userInput:string) {
        let returnArgs = []
        try {
          var safeEval = require('notevil')
          let userFunction = safeEval.Function(...inputparams,userInput)
          tests.forEach(openTest => {
            let testInput = JSON.parse(openTest.input)
            let expectedOutput = JSON.parse(openTest.output)
            let currentoutput = userFunction.apply('sandbox',testInput)
            let testDescription = "EXPECT "+JSON.stringify(testInput)+" TO BE "+JSON.stringify(expectedOutput)+"-> GETTING "+JSON.stringify(currentoutput)
            if(currentoutput===expectedOutput) {
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

    function codingSubmit(task:any) {
        return "SUBMITTED"
    }

export default {getOpenTests,submit}