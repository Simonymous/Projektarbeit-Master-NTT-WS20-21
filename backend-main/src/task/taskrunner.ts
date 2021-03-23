import * as plugins from '../plugins/plugins.json'
const pluginDirectoryPath = "../plugins/"

export default class taskRunner {
  constructor() {}

  async runTests(task:any,input:any):Promise<any> {
    console.log("[LOG] Running Tests:",task.openTests,"for data:",input)
    const plugin = await this.getPlugin(task.pluginCode)
    const testResult = plugin.default.getOpenTests(task.dataForPlugin,task.openTests,input)
    return testResult
  }

  async submitTask(task:any,input:any):Promise<number> {
      console.log("[LOG] Submitting:",task.closedTests,"for data:",input)
      const plugin = await this.getPlugin(task.pluginCode)
      const submittedResult = plugin.default.submit(task.dataForPlugin,task.closedTests,input)
      return submittedResult
  }

  private async getPlugin(pluginCode:string) {
    let pluginFileName:string
    let pluginDirectory:string
    plugins.forEach(plugin=> {
      if(plugin.name == pluginCode) {
        pluginFileName=plugin.mainFile
        pluginDirectory=plugin.directory
      }
    })
    const pathToFile = pluginDirectoryPath+pluginDirectory+'/'+pluginFileName
    return import(pathToFile)
  }

}