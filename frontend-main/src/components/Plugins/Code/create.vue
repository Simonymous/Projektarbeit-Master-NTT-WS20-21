<template>
  <div>
    <div>
      <prism-editor
        class="my-editor"
        v-model="code"
        :highlight="highlighter"
        line-numbers
        @input="inputChanged"
      ></prism-editor>
    </div>
    <div>
      <DataTable
        :value="openTestsRows"
        :resizableColumns="true"
        editMode="cell"
        columnResizeMode="expand"
        class="editable-cells-table"
      >
        <Column field="input" header="Input">
          <template #editor="slotProps">
            <InputText v-model="slotProps.data[slotProps.column.props.field]" />
          </template>
        </Column>
        <Column field="output" header="Output">
          <template #editor="slotProps">
            <InputText v-model="slotProps.data[slotProps.column.props.field]" />
          </template>
        </Column>
        <Column field="test" >
        
        </Column>
        <Column :exportable="false">
          <template #body="slotProps">
            <Button
              icon="pi pi-save"
              class="p-button-rounded p-button-success p-mr-2"
              @click="addNewOpenTest()"
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

    watch(props, () => {
      code.value = props.taskData.dataForPlugin.defaultCode;
      openTestsRows.value = props.taskData.openTests;
    });

    // onMounted(() => code.value = props.taskData.dataForPlugin.defaultCode)

    console.log(props.taskData);

    let code = ref(props.taskData?.dataForPlugin?.defaultCode);

    function highlighter(code) {
      return highlight(code, languages.js, "typescript"); // languages.<insert language> to return html with markup
    }

    function inputChanged() {
      emit("updateReturnValue", code.value);
    }



    function addNewOpenTest() {
      openTestsRows.value.unshift({});
      console.log(openTestsRows.value)}

    
    return {
      code,
      highlighter,
      inputChanged,
      addNewOpenTest,
      openTestsRows
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