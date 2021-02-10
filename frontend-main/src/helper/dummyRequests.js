
export function getBackendRequestDummy (pathName) {
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
      openTests: [{input: "[a:'3', '4']", output: "7"}],
      closedTests: [{}],
      dataForPlugin: { defaultCode: '[Vue warn]: Extraneous non-props attributes (active) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. ' },
      date: new Date('20/01/1999')
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
      { name: 'Mathe 1', code: 3 },
      { name: 'Deutsch 1', code: 2 }
    ]
  }
}

export function postBackendRequestDummy (pathName, data) {
  if (pathName.includes('task/testTask')) {
    return ([{status: 'success', title: 'Teaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaast1', detail: 'Test1Detail'}, {status: 'error', title: 'Test2'}])
  }
}
