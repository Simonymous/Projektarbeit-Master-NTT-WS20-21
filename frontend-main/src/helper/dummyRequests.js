
export function getBackendRequestDummy(pathName) {
  if (pathName.includes('task/')) {
    return {
      ID: 69,
      type: 'task',
      pluginCode: 'codeJS',
      title: 'DummyPlugin',
      tags: ['aaa', 'bbbb'],
      course: 'HTML Programmierung',
      creator: 'Mahan',
      description: 'The includes() method determines whether one string may be found within another string, returning true or false as appropriate.',
      openTests: [{ input: "[a:'3', '4']", output: "7" }],
      closedTests: [{}],
      dataForPlugin: { defaultCode: '[Vue warn]: Extraneous non-props attributes (active) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. ' },
      date: new Date('20/01/1999')
    }
  } else if (pathName.includes('taskCollection/')) {
    return {
      ID: "187",
      type: "TaskCollection",
      title: "Ich bin ein Aufgabenblatt",
      description: "Beschreibung Beschreibung Beschreibung Beschreibung ",
      date: new Date('20/01/1999'),
      tags: ['hochschule', 'fur', 'technik', 'wirtschaft'],
      fach: 'Prog5',
      creator: 'Dr. Ucker',
      tasks: [{ ID: 96, weighting: 66, taskName: "qwertzuiop" }, { ID: 10, weighting: 34, taskName: "unwichtiger Task" }, { ID: 10, weighting: 35, taskName: "wichitger Task" }]
    }

  } else if (pathName.includes('taskCollection')) {
    return [
      {
        label: 'Aufgabenblatt 1',
        items: [
          {
            label: 'Exercise 1'
          },
          { label: 'Exercise 2' }
        ]
      },
      {
        label: 'Aufgabenblatt 2',
        items: [
          {
            label: 'Exercise 3'
          },
          { label: 'Exercise 4' }
        ]
      }
    ]
  } else if (pathName.includes('task')) {
    return [
      { title: 'Mathe 1', _id: 3 },
      { title: 'Deutsch 1', _id: 2 },
      { title: 'Deutsch 2', _id: 4 }
    ]
  }
}

export function postBackendRequestDummy(pathName, data) {
  if (pathName.includes('task/testTask')) {
    return ([{ status: 'success', title: 'Teaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaast1', detail: 'Test1Detail' }, { status: 'error', title: 'Test2' }])
  }
}
