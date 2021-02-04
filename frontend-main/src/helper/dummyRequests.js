
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
            openTests: [{input:"spdkn", output:"oisndfs"}],
            closedTests: [{}],
            dataForPlugin: {defaultCode:"[Vue warn]: Extraneous non-props attributes (active) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. "},
            date: new Date("20/01/1999"),
        }
    }
  }