module.exports = function (ID, type, pluginCode, dataForPlugin, title, tags, course, creator, description, openTests, closedTests, date) {
  this.ID = ID
  this.type = type
  this.pluginCode = pluginCode
  this.dataForPlugin = dataForPlugin
  this.title = title
  this.description = description
  this.date = date
  this.tags = tags
  this.course = course
  this.creator = creator
  this.openTests = openTests
  this.closedTests = closedTests
}
