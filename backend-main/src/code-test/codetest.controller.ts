
import { Controller, Post, Body } from '@nestjs/common';
const testCases = [
    {
       name:"Add 12 and 13 to be 25", 
       input: [12,13],
       output: 25
    },
    {
        name:"Add 1 and 1 to be 3..LOL", 
        input: [1,1],
        output: 3
     },
     {
        name:"ADD 1 and 2 to be 3",
        input: [1,2],
        output: 3
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
            if(userFunction.apply(null,test.input)===test.output) {
                returnArgs.push(testDescription+"...PASSED")
            } else {
                returnArgs.push(testDescription+"...NOT PASSED")
            }
        })
      } catch {
          console.log("Funktion konnte nicht erzeugt werden")
      }
      
      //console.log(myFunction(12,3))
      //const result = diff(meinCode, code.code);
      //console.log(result)
      return returnArgs;
  }
}


