
export function getBackendRequestDummy(pathName) {
    if(pathName.includes("task")){
        return {
            ID: 69,
            type: "task",
            pluginCode: "codeJS",
            title: "DummyPlugin",
            tags: ["aaa", "bbbb"],
            course: "HTML Programmierung",
            creator: "Mahan",
            description: "The includes() method determines whether one string may be found within another string, returning true or false as appropriate.",
            openTests: [{}],
            closedTests: [{}],
            dataForPlugin: {},
            date: new Date("20/01/1999"),
        }
    }
  }