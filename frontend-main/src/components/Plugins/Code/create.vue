<template>
  <div>
    <div>
      <prism-editor
        class="my-editor"
        v-model="code"
        :highlight="highlighter"
        line-numbers
        @input="codeChanged"
      ></prism-editor>
    </div>
    <div>
      <Button label="Neuer offener Test anlegen:" @click="addNewOpenTest()" />
      <DataTable
        :value="openTestsRows"
        :resizableColumns="true"
        editMode="cell"
        columnResizeMode="expand"
        class="editable-cells-table"
      >
        <Column field="input" header="Eingabe Wert(e): ['a', 'b']">
          <template #editor="slotProps">
            <InputText v-model="slotProps.data[slotProps.column.props.field]" />
          </template>
        </Column>
        <Column field="output" header="Erwarteter Output: 'c'">
          <template #editor="slotProps">
            <InputText v-model="slotProps.data[slotProps.column.props.field]" />
          </template>
        </Column>
        <Column :exportable="false">
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
      <Button label="Neuer geschlossener Test anlegen:" @click="addNewClosedTest()" />
      <DataTable
        :value="closedTestsRows"
        :resizableColumns="true"
        editMode="cell"
        columnResizeMode="expand"
        class="editable-cells-table"
      >
        <Column field="input" header="Eingabe Wert(e): ['a', 'b']">
          <template #editor="slotProps">
            <InputText v-model="slotProps.data[slotProps.column.props.field]" />
          </template>
        </Column>
        <Column field="output" header="Erwarteter Output: 'c'">
          <template #editor="slotProps">
            <InputText v-model="slotProps.data[slotProps.column.props.field]" />
          </template>
        </Column>
        <Column :exportable="false">
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
import { PrismEditor } from "vue-prism-editor";
import "vue-prism-editor/dist/prismeditor.min.css"; // import the styles somewhere

// import highlighting library (you can use any library you want just return html string)
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css"; // import syntax highlighting styles

import { ref, watch, onMounted } from "vue";

export default {
  components: {
    PrismEditor,
  },
  props: {
    taskData: Object,
  },
  setup(props, { emit }) {
    let openTestsRows = ref(props.taskData.openTests);
    let closedTestsRows = ref(props.taskData.closedTests);

    // watch(props, () => {
    //   code.value = props.taskData.dataForPlugin.defaultCode;
    //   openTestsRows.value = props.taskData.openTests;
    //   closedTestsRows.value = props.taskData.closedTests;
    // });

    let code = ref(props.taskData?.dataForPlugin?.defaultCode);

    function highlighter(code) {
      return highlight(code, languages.js, "typescript"); // languages.<insert language> to return html with markup
    }

    function addNewOpenTest() {
      openTestsRows.value.unshift({});
      emitChanges();
    }

    function addNewClosedTest(){
      console.log(closedTestsRows.value)
      closedTestsRows.value.unshift({});
      emitChanges();
    }

    function removeOpenTest(a) {
      if (openTestsRows.value.length > 0) {
        openTestsRows.value.splice(a.index, 1);
      }
      emitChanges();
    }

    function removeClosedTest(a){
      if (closedTestsRows.value.length > 0) {
        closedTestsRows.value.splice(a.index, 1);
      }
      emitChanges();
    }

    function codeChanged() {
      emitChanges();
    }

    function emitChanges() {
      let taskData = {
        ...props.taskData,
        dataForPlugin: code.value,
        openTests: openTestsRows.value,
        closedTests: closedTestsRows.value,
      };
      emit("pluginChangedData", taskData);
    }

    return {
      code,
      highlighter,
      codeChanged,
      addNewOpenTest,
      openTestsRows,
      removeOpenTest,
      removeClosedTest,
      addNewClosedTest,
      closedTestsRows
    };
  },
};
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