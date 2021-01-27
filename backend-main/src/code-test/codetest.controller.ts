
import { Controller, Post, Body } from '@nestjs/common';
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
@Controller('codetest')
export class CodetestController {
  constructor() {}

  @Post('/javascript')
  testJavascript(@Body() code: any) {
      let returnArgs = [];
      try {
        //let userFunction = new Function('a','b',code.code)
        let userFunction = new Function('a','b',code.code)
        testCases.forEach(function(test) {
            let testDescription = "EXPECT "+JSON.stringify(test.input)+" TO BE "+JSON.stringify(test.output)
            //console.log(userFunction.apply(null,test.input),"console.log(test); return 2;")
            if(userFunction.apply('sandbox',test.input)===test.output) {
                returnArgs.push(testDescription+"...PASSED")
            } else {
                returnArgs.push(testDescription+"...NOT PASSED")
            }
        })
      } catch {
          console.log("Funktion konnte nicht erzeugt werden")
      }
      

      return returnArgs;
  }
}


