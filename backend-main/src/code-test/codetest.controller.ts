import { Controller, Post, Body } from '@nestjs/common';
//import {safeEval} from 'notevil'
const testCases = [
    {
       name:"Add 12 and 13 to be 25", 
       input: [12,13],
       output: 25
    },
    {
        name:"Add 1 and 1 to be 2", 
        input: [1,1],
        output: 2
     },
     {
        name:"Add 1 and 2 to be 3",
        input: [1,2],
        output: 3
     },
     {
        name:"Add -1 and 2 to be 1",
        input: [-1,2],
        output: 1
     },
]
const functionargs = ['a','b']

@Controller('codetest')
export class CodetestController {
  constructor() {}

  @Post('/javascript')
  testJavascript(@Body() code: any) {
      let returnArgs = [];
      try {
        var safeEval = require('notevil')
        let userFunction = safeEval.Function(...functionargs,code.code)
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
      

      return returnArgs;
  }
}


