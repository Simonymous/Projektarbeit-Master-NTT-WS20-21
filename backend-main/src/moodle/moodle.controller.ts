
import { Controller, Post, Body, Get, Param, Patch, Delete, Res, HttpStatus, UseGuards, Req, Redirect } from '@nestjs/common';
var uuid = require("uuid4");
var lti = require("ims-lti");


@Controller('moodle')
export class MoodleController {
  constructor() {}

  @Post()
  getMoodle(
      @Req() request,
      @Res() response
  ) {
    var provider = new lti.Provider("top", "secret");
    let returnString = '';
    provider.valid_request(request, (err, isValid) => {
      if (!isValid) {
        console.log("INVALID")
        
        return "INVALID"+err
      }
      var sessions = {};

      var sessionID = uuid();
      sessions[sessionID] = provider;
      console.log(provider.body)
      //console.log(provider)
      return "OK"
    })
    //console.log(request)
    //console.log(provider)
    //return returnString;
    // return "OK"
    return response.redirect('http://localhost:8080')
  }
}
