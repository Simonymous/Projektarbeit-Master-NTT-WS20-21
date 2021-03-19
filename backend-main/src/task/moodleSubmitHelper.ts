export default class moodleSubmitHelper {
    constructor() {}

    public submitNoteToMoodle(session:any,grade:number) {
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
    }
}
