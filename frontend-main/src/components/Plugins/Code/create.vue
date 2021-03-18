<template>
  <div>
    <div>
      <prism-editor
        class="my-editor"
        v-model="code"
        :highlight="highlighter"
        line-numbers
      ></prism-editor>
    </div>
    <div>
      <h3>Test input Parameter:</h3>
      <InputText
        type="text"
        v-model="testFunctionParams"
        placeholder="param1, param2, ..."
        @input="emitChanges"
      />
      <!-- <Button label="Neuer offener Test anlegen:" @click="addNewOpenTest()" /> -->
      <h3>Offene Tests</h3>
      <DataTable
        :value="openTestsRows"
        :resizableColumns="true"
        editMode="cell"
        columnResizeMode="expand"
        class="editable-cells-table"
      >
        <Column field="input" header="Eingabe Wert(e): [{''a'':1},{''b'':2}]">
          <template #editor="slotProps">
            <InputText
              v-model="slotProps.data[slotProps.column.props.field]"
              @input="emitChanges"
            />
          </template>
        </Column>
        <Column field="output" header="Erwarteter Output: c">
          <template #editor="slotProps">
            <InputText
              v-model="slotProps.data[slotProps.column.props.field]"
              @input="emitChanges"
            />
          </template>
        </Column>
        <Column :exportable="false">
          <template #header>
            <Button
              icon="pi pi-plus"
              @click="addNewOpenTest()"
              class="p-button-rounded p-button-text p-button-plain"
            />
          </template>
          <template #body="slotProps">
            <Button
              icon="pi pi-trash"
              class="p-button-rounded p-button-danger p-button-outlined"
              @click="removeOpenTest(slotProps)"
            />
          </template>
        </Column>
      </DataTable>
    </div>
    <div>
      <!-- <Button
        label="Neuer geschlossener Test anlegen:"
        @click="addNewClosedTest()"
      /> -->
      <h3>Geschlossene Tests</h3>
      <DataTable
        :value="closedTestsRows"
        :resizableColumns="true"
        editMode="cell"
        columnResizeMode="expand"
        class="editable-cells-table"
      >
        <Column field="input" header="Eingabe Wert(e): [{''a'':1},{''b'':2}]">
          <template #editor="slotProps">
            <InputText
              v-model="slotProps.data[slotProps.column.props.field]"
              @input="emitChanges"
            />
          </template>
        </Column>
        <Column field="output" header="Erwarteter Output: 'c'">
          <template #editor="slotProps">
            <InputText
              v-model="slotProps.data[slotProps.column.props.field]"
              @input="emitChanges"
            />
          </template>
        </Column>
        <Column :exportable="false">
          <template #header>
            <Button
              icon="pi pi-plus"
              @click="addNewClosedTest()"
              class="p-button-rounded p-button-text p-button-plain"
            />
          </template>
          <template #body="slotProps">
            <Button
              icon="pi pi-trash"
              class="p-button-rounded p-button-danger p-button-outlined"
              @click="removeClosedTest(slotProps)"
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script>
import { PrismEditor } from 'vue-prism-editor'
import 'vue-prism-editor/dist/prismeditor.min.css' // import the styles somewhere

// import highlighting library (you can use any library you want just return html string)
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism-tomorrow.css' // import syntax highlighting styles

import { ref, watch, onMounted } from 'vue'

export default {
  components: {
    PrismEditor,
  },
  props: {
    taskData: Object,
  },
  setup(props, { emit }) {
    // let openTestsRows = ref([...props.taskData.openTests]);
    let openTestsRows = ref(
      JSON.parse(JSON.stringify(props.taskData.openTests)),
    )
    let closedTestsRows = ref([...props.taskData?.closedTests])
    let testFunctionParams = ref(
      arrayToString(props.taskData?.dataForPlugin?.inputParams),
    )
    let code = ref(props.taskData?.dataForPlugin?.defaultCode)

    watch(props, () => {
      code.value = props.taskData.dataForPlugin.defaultCode
      openTestsRows.value = JSON.parse(
        JSON.stringify(props.taskData?.openTests),
      )
      closedTestsRows.value = [...props.taskData?.closedTests]
      testFunctionParams.value = arrayToString(
        props.taskData?.dataForPlugin?.inputParams,
      )
    })

    function arrayToString(arr = []) {
      let returnString = ''
      arr.forEach((item) => {
        returnString += item.toString() + ', '
      })

      returnString = returnString.length ? returnString.slice(0, -2) : ''
      return returnString
    }

    function highlighter(code) {
      return highlight(code, languages.js, 'typescript') // languages.<insert language> to return html with markup
    }

    function addNewOpenTest() {
      openTestsRows.value.unshift({})
      emitChanges()
    }

    function addNewClosedTest() {
      console.log(closedTestsRows.value)
      closedTestsRows.value.unshift({})
      emitChanges()
    }

    function removeOpenTest(a) {
      if (openTestsRows.value.length > 0) {
        openTestsRows.value.splice(a.index, 1)
      }
      emitChanges()
    }

    function removeClosedTest(a) {
      if (closedTestsRows.value.length > 0) {
        closedTestsRows.value.splice(a.index, 1)
      }
      emitChanges()
    }

    function splitTestFunctionParams() {
      let splittedInputParams = testFunctionParams.value.split(',')

      splittedInputParams.forEach((param, index) => {
        splittedInputParams[index] = param.trim()
      })
      return splittedInputParams
    }

    function emitChanges() {
      console.log(testFunctionParams.value)
      let taskData = {
        ...props.taskData,
        dataForPlugin: {
          defaultCode: code.value,
          inputParams: splitTestFunctionParams(),
        },
        openTests: openTestsRows.value,
        closedTests: closedTestsRows.value,
      }
      console.log(taskData)
      emit('pluginChangedData', taskData)
    }

    return {
      code,
      highlighter,
      addNewOpenTest,
      openTestsRows,
      removeOpenTest,
      removeClosedTest,
      addNewClosedTest,
      closedTestsRows,
      testFunctionParams,
      emitChanges,
    }
  },
}
</script>

<style>
/* required class */
.my-editor {
  /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
  background: #2d2d2d;
  color: #ccc;

  /* you must provide font-family font-size line-height. Example: */
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
  height: 200px;
}

/* optional class for removing the outline */
.prism-editor__textarea:focus {
  outline: none;
}
</style>
