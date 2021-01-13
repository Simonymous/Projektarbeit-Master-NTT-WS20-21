
import { Controller, Post, Body, Get, Param, Patch, Delete, Res, HttpStatus, UseGuards, Req, Redirect } from '@nestjs/common';
/**
 * 
 * https://developer.ibm.com/depmodels/cloud/tutorials/implement-learning-tool-interoperability/
 * 
 */
var uuid = require("uuid4"); //Für das speichern der session -> Auch denkbar mit json token?
var lti = require("ims-lti"); //Modifiziertes ims lti, siehe outcomes.js l206

var a;

@Controller('moodle')
export class MoodleController {
  constructor() {}

  @Post(':grade')
  sendGrade(
    @Param ('grade') grade
  ) {
    console.log("[LOG] Note erhalten: "+grade)
    if(a) {                                 //Note muss durch 100 dividiert werden E 0-1
      a.outcome_service.send_replace_result(grade/100, (err, isValid) => {
        if (!isValid) {
          if(!a.outcome_service) {
            console.log("[LOG] Kein outcome service vorhanden!")
          }
          console.log("[LOG] INVALID Grade:")
          console.log(err)
          
          return "INVALID GRADE "+err
        }
        console.log("[LOG] Note erfolgreich übermittelt")
        return ('OK')
      })
    } else {
      return "Kein Provider vorhanden!"
    }
  }

  @Post()
  getMoodle(
      @Req() request,
      @Res() response
  ) {
    var provider = new lti.Provider("top", "secret"); //Shared und public Secret aus moodle
    provider.valid_request(request, (err, isValid) => {
      if (!isValid) {
        console.log("[LOG] INVALID LTI REQUEST..")
        
        return "INVALID:"+err
      }

      a = provider; //Temporäre Lösung bis die Sesssions in die DB geschoben werden
      
      return "Provider läuft.."
    })

    console.log("[LOG] LTI Session initiiert:")
    console.log(a)

    //console.log(request)
    //console.log(provider)

    //return "OK"
    return response.redirect('http://localhost:8080')
  }
}


