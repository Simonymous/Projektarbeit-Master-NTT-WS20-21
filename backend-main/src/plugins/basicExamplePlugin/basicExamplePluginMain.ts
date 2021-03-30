/*
 *
 * This Plugin demonstrates a basic Example how a Plugin should be written
 * Beside Creating that File, make sure, the File and directory path
 * is listed in plugins.json from the /plugins directory
 *
 * You can create as Much Files as you want, just make sure that one Main file contents and exports the two
 * Functions getOpenTests() and submit() with the expected Parameters and Returns
 *
 */

/**
 *
 * @param data dataForPlugin from createdPlugin (see Frontend)
 * @param tests open Tests from Frontend (In Format Input -> Expected Output)
 * @param userInput userInput to test
 * @returns Feedback for Open Tests
 *
 */
function getOpenTests(data:any,tests:any,input:any):any {
    return "Tested.."
}

/**
 *
 * @param data dataForPlugin from createdPlugin (see Frontend)
 * @param tests closed Tests from Frontend (In Format Input -> Expected Output)
 * @param userInput userInput to submit
 * @returns Note for the user submission (in 0-100 !!)
 *
 */
function submit(data:any,tests:any,input:any):number {
    return 100
}

//Make sure to export the two Methods getOpenTests() and submit()
export default { getOpenTests,submit }