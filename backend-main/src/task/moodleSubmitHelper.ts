export default class moodleSubmitHelper {
    constructor() {}

    public submitNoteToMoodle(session:any,grade:number) {
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
