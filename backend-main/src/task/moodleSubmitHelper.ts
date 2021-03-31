export default class moodleSubmitHelper {
    constructor() {}

    /**
     * Submits a note to a given moodle session
     * @param session moodle session to submit to
     * @param grade grade (in 0-100)
     */
    public submitNoteToMoodle(session:any,grade:number) {
    //Grade must be rounded as moodle expects 0-1
    session.outcome_service.send_replace_result(grade/100, (err, isValid) => {
      if (!isValid) {
        if(!session.outcome_service) {
          console.log("[LOG] No Outcome Service in session!")
        }
        console.log("[LOG] INVALID Grade:")
        console.log(err)

        return "INVALID GRADE "+err
      }
      console.log("[LOG] Note submitted: ",grade)
      return ('OK')
      })
    }
}
