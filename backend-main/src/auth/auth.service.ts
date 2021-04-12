import { Injectable, Req, Res } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import moodleSessions from './moodleSessions'
import * as config from '../config.json'

var lti = require("ims-lti");
@Injectable()
export class AuthService {

  constructor( private usersService: UsersService,
               private jwtService: JwtService
              ) {}

  /**
   *
   * Validates a username/password
   *
   * @param username
   * @param pass
   * @returns user if okay and null if not okay
   */
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

  /**
   * Login a User and create token
   * @param user userDto
   * @returns token
   */
  async login(user: any) {
    const validatedUser = await this.usersService.findOne(user.username)
    //console.log(validatedUser)
    const payload = { username: validatedUser.username, sub: validatedUser.password};
    console.log(this.jwtService.decode( this.jwtService.sign(payload)))
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /**
   *
   * Initiate a LTI Session and parse data
   * @param request LTI Request from moodle
   * @returns relevant data for lti session
   *
   */
  async ltiSessionInitiate(request):Promise<any> {
    let provider = new lti.Provider(config.moodle_consumer_key, config.moodle_consumer_secret); //Shared und public Secret aus moodle
    let taskId;
    let userId;
    let userName;
    let userMail;
    let access_token;
    provider.valid_request(request, (err, isValid) => {
      if (!isValid) {
        console.log("[LOG] INVALID LTI REQUEST"+err)

        return "INVALID: "+err
      }
      console.log("[LOG] LTI Session initiated:",provider)
      if(provider.body.custom_taskid) taskId = provider.body.custom_taskid
      userId = provider.body.user_id
      userName = provider.body.ext_user_username
      userMail = provider.body.lis_person_contact_email_primary

      const payload = {'obj': userMail}
      access_token = this.jwtService.sign(payload)

      const sessions = moodleSessions.getInstance();
      sessions.addSession(access_token,provider)

    })

    return {name:userName,userId:userId,mail:userMail,token:access_token, taskId: taskId}

  }

  /**
   *
   * Login or create a new moodle user and check if task exists
   *
   * @param userName
   * @param userMail
   * @param taskId
   * @returns moodle User and boolean for task status
   */
  async loginMoodleUserAndGetTask(userName,userMail,taskId):Promise<any> {
    const moodleUser = await this.usersService.findMoodleUser(userMail)
    let solved = false;
    if(!moodleUser) {
      this.usersService.createMoodleUser(userMail,userName)
    } else {
      //Has The User already solved it?
      if(moodleUser.solvedTasksOrCollections) solved = moodleUser.solvedTasksOrCollections.has(taskId)

    }
      return {user:moodleUser, solved: solved}
  }
}