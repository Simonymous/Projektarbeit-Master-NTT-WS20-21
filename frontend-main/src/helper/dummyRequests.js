export function getBackendRequestDummy(pathName) {
  //Spezifischer Task
  if (pathName.includes("task/")) {
    return {
      _id: 69,
      type: "task",
      pluginCode: "codeJS",
      title: "DummyPlugin",
      tags: ["aaa", "bbbb"],
      course: "HTML Programmierung",
      creator: "Mahan",
      description:
        "The includes() method determines whether one string may be found within another string, returning true or false as appropriate.",
      openTests: [{ input: "[a:'3', '4']", output: "7" }],
      closedTests: [{}],
      dataForPlugin: {
        defaultCode:
          "[Vue warn]: Extraneous non-props attributes (active) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. ",
        // inputParams: [],
      },
      date: new Date("20/01/1999"),
    };
    //Spezifische TaskCollection:
  } else if (pathName.includes("taskCollection/")) {
    return {
      _id: "187",
      type: "TaskCollection",
      title: "Ich bin ein Aufgabenblatt",
      description: "Beschreibung Beschreibung Beschreibung Beschreibung ",
      date: new Date("20/01/1999"),
      tags: ["hochschule", "fur", "technik", "wirtschaft"],
      course: "Prog5",
      creator: "Dr. Ucker",
      tasks: [
        { _id: 96, weighting: 66, title: "qwertzuiop" },
        { _id: 10, weighting: 34, title: "unwichtiger Task" },
        { _id: 15, weighting: 35, title: "wichitger Task" },
      ],
    };

    //Alle Taskcollections
  } else if (pathName.includes("taskCollection")) {
    return [
      {
        title: "Aufgabenblatt 1",
        _id: "45",
        tasks: [
          { title: "Exercise 1", _id: "46" },
          { title: "Exercise 2", _id: "47" },
        ],
      },
      {
        title: "Aufgabenblatt 2",
        _id: "48",
        tasks: [
          { title: "Exercise 3", _id: "49" },
          { title: "Exercise 4", _id: "50" },
        ],
      },
    ];
    //Alle Tasks
  } else if (pathName.includes("task")) {
    return [
      { title: "Mathe 1", _id: 3 },
      { title: "Deutsch 1", _id: 2 },
      { title: "Deutsch 2", _id: 4 },
    ];
  }
}

export function postBackendRequestDummy(pathName, data) {
  if (pathName.includes("task/testTask")) {
    return [
      {
        status: "success",
        title:
          "Teaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaast1",
        detail: "Test1Detail",
      },
      { status: "error", title: "Test2" },
    ];
  }
}
