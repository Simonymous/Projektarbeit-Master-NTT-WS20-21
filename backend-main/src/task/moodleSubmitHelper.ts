import moodleSessions from '../auth/moodleSessions'


export default class moodleSubmitHelper {
    constructor() {}

    public submitSingleTask(token:string,grade:number) {
        const sessions = moodleSessions.getInstance()
        const session = sessions.getSession(token)
        if(session) {
            session.outcome_service.send_replace_result(grade/100, (err, isValid) => {
                if (!isValid) {
                  if(!session.outcome_service) {
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
            console.log("[LOG] Keine Session gefunden")
            return 'no session'
        }
        return 'OK'
    }
}

/**if(a) {                                 //Note muss durch 100 dividiert werden E 0-1
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
  }**/