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
        let returnTests = []
        let message = ""
        let countPassed = 0
        try {
          userInput = getBody(userInput)
          var safeEval = require('notevil')
          let userFunction = safeEval.Function(...inputparams,userInput)
          tests.forEach(openTest => {
            let testInput = JSON.parse(openTest.input)
            let expectedOutput = JSON.parse(openTest.output)
            let currentoutput = userFunction.apply('sandbox',testInput)
            let testDescription = "EXPECT "+JSON.stringify(testInput)+" TO BE "+JSON.stringify(expectedOutput)+"-> GETTING "+JSON.stringify(currentoutput)
            if(currentoutput===expectedOutput) {
                returnTests.push({passed:true,message:testDescription})
                countPassed++
            } else {
                returnTests.push({passed:false,message:testDescription})
            }
          })
          message = countPassed+"/"+tests.length+" PASSED"
        } catch(e) {
            console.log("Funktion konnte nicht erzeugt werden",e)
            message = "Compile Error: "+e.message
        }
        const returnObj = {
            message: message,
            testResults: returnTests
        }

        return returnObj
      }

    function codingSubmit(task:any) {
        return "SUBMITTED"
    }

    const getBody = (string) => string.substring(
        string.indexOf("{") + 1,
        string.lastIndexOf("}")
      )

export default {getOpenTests,submit}

