import * as plugins from './plugins.json' //Prüfen ob dynamisch funktioniert wenn sich json ändert...
const pluginDirectoryPath = "./plugins/"
export default class taskRunner {
  constructor() {}

  public runTests(task:any,userInput:string):any {
    console.log("[LOG] Running Tests:",task.openTests)
    let pluginFileName:string
    plugins.forEach(plugin=> {
      if(plugin.name == task.pluginCode) pluginFileName=plugin.file
    })
    const pathToFile = pluginDirectoryPath+pluginFileName
    import("./plugins/testPlugin2").then((a)=>{
      //Hier ist das Plugin erfolgreich importiert
      //und die Funktionen in der definierten ts Datei können verwendet werden
    })
  }

  public submitTask(task:any,userInput:string):any {
      return "submitted"
  }

}