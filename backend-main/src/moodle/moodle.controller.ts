
import { Controller, Post, Body, Get, Param, Patch, Delete, Res, HttpStatus, UseGuards, Req, Redirect } from '@nestjs/common';
var uuid = require("uuid4");
var lti = require("ims-lti");

var a;

@Controller('moodle')
export class MoodleController {
  constructor() {}

  @Post(':grade')
  sendGrade(
    @Param ('grade') grade
  ) {
    console.log("Grade erhalten: "+grade)
    if(a) {
      a.outcome_service.send_replace_result(grade, (err, isValid) => {
        if (!isValid) {
          if(!a.outcome_service) {
            console.log("Kein outcome service vorhanden!")
          }
          console.log("INVALID Grade!!")
          console.log(err)
          
          return "INVALID GRADE "+err
        }
        console.log("Note erfolgreich übermittelt")
        return ('OK')
      })
    } else {
      return "Kein Provider vorhanden!"
    }

  }

  @Post()
  getMoodle(
      @Req() request,
  ) {
    var provider = new lti.Provider("top", "secret");
    provider.valid_request(request, (err, isValid) => {
      if (!isValid) {
        console.log("INVALID")
        
        return "INVALID"+err
      }

      a = provider;
      



      // console.log(provider)
      // console.log("-------------------------")
      // console.log(sessionID)
      // console.log("-------------------------")
      // console.log(sessions)
      // console.log("-------------------------")
      // console.log(provider.outcome_service)
      // provider.outcome_service.send_replace_result(1, (err, isValid) => {
      //   if (!isValid) {
      //     console.log("INVALID Grade!!")
      //     console.log(err)
          
      //     return "INVALID"+err
      //   }
      //   console.log("Nice")
      //   return ('OK')
      // })
      return "OK"
    })


    console.log(a)

    //console.log(request)
    //console.log(provider)
    //return returnString;
    return "OK"
    // return response.redirect('http://localhost:8080')
  }
}


