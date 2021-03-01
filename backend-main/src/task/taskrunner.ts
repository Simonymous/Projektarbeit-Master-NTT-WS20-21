import * as plugins from './plugins.json' //Prüfen ob dynamisch funktioniert wenn sich json ändert...
const pluginDirectoryPath = "./plugins/"

interface IPlugin {
  openTest: Function,
  submit: Function
}
export default class taskRunner {
  constructor() {}

  async runTests(task:any,userInput:string):Promise<any> {
    console.log("[LOG] Running Tests:",task.openTests)
    const plugin = await this.getPlugin(task.pluginCode)
    const testResult = plugin.default.getOpenTests(task.openTests,userInput)
    return testResult
  }

  async submitTask(task:any,userInput:string):Promise<any> {
      console.log("[LOG] Submitting:",task.closedTests)
      const plugin = await this.getPlugin(task.pluginCode)
      const submittedResult = plugin.default.submit(task.closedTests,userInput)
      return submittedResult
  }

  private async getPlugin(pluginCode:string) {
    let pluginFileName:string
    plugins.forEach(plugin=> {
      if(plugin.name == pluginCode) pluginFileName=plugin.file
    })
    const pathToFile = pluginDirectoryPath+pluginFileName
    return import(pathToFile)
  }

}