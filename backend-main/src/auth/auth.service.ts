import { Injectable, Req, Res } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import moodleSessions from './moodleSessions'
const moodleKey = "top"
const moodlePassword = "secret"

var lti = require("ims-lti");
@Injectable()
export class AuthService {

  constructor( private usersService: UsersService,
               private jwtService: JwtService
              ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    //console.log(user)
    const dbPassword = await user.password;
    const matching = await bcrypt.compare(pass,dbPassword);
    if(matching) {
      return await user;
    }
    else return null;
  }


  async login(user: any) {
    const validatedUser = await this.usersService.findOne(user.username)
    //console.log(validatedUser)
    const payload = { username: validatedUser.username, sub: validatedUser.password};
    console.log(this.jwtService.decode( this.jwtService.sign(payload)))
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async moodleLogin(request) {
    let solved = false
    let provider = new lti.Provider(moodleKey, moodlePassword); //Shared und public Secret aus moodle
    let sessions = moodleSessions.getInstance();
    let access_token = "";
    let taskId;
    let that = this;

    provider.valid_request(request, (err, isValid) => {
      if (!isValid) {
        console.log("[LOG] INVALID LTI REQUEST..")

        return "INVALID:"+err
      }
      console.log("[LOG] LTI Session initiiert:",provider)
      taskId = provider.body.custom_taskId
      let userId = provider.body.user_id
      let userName = provider.body.ext_user_username
      let userMail = provider.body.lis_person_contact_email_primary

      that.usersService.findMoodleUser(userMail,userName).then((user)=> {
        //Wenn der moodle Nutzer noch nicht im System ist->einpflegen
        if(!user) {
          this.usersService.createMoodleUser(userMail,userName)
        } else {
          solved = user.solvedTasksOrCollections.includes(taskId)
        }
      })
      const payload = {'obj':'test'}
      access_token = this.jwtService.sign(payload)
      sessions.addSession(access_token,provider)

    })

    //TODO: ASYNC BUGFIX FOR SOLVED
    return {access_token: access_token,
            taskId: taskId, solved: solved}
  }
}