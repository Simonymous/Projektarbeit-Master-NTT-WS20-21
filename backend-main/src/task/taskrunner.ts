import * as plugins from '../plugins/plugins.json'
//Path to Plugin Directory (this is not in the config.json because the directory path should not be changed)
const pluginDirectoryPath = "../plugins/"

export default class taskRunner {
  constructor() {}

  /**
   *  Runs the Tests for a Plugin and returns the result
   *
   * @param task raw Task created by plugin developer
   * @param input raw input from frontend
   * @returns raw open tests result from plugin openTests method
   *          or null if the plugin is not found
   */
  async runTests(task:any,input:any):Promise<any> {
    console.log("[LOG] Running Tests:",task.openTests,"for data:",input)
    const plugin = await this.getPlugin(task.pluginCode)
    if(plugin) {
      const testResult = plugin.default.getOpenTests(task.dataForPlugin,task.openTests,input)
      return testResult
    } else return null
  }

  /**
   *  Submit a Task for a Plugin
   *
   * @param task raw Task created by plugin developer
   * @param input raw input from frontend
   * @returns raw feedback result from plugin openTests method
   *          or null if the plugin is not found
   */
  async submitTask(task:any,input:any):Promise<number> {
      console.log("[LOG] Submitting:",task.closedTests,"for data:",input)
      const plugin = await this.getPlugin(task.pluginCode)
      const submittedResult = plugin.default.submit(task.dataForPlugin,task.closedTests,input)
      return submittedResult

  }

  /**
   *
   * @param pluginCode pluginCode (like Name) for created Plugin (must match in frontend and backend)
   * @returns Import of the given file (if it exists) or null (if it doesnt exist)
   *
   */
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