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
  setup(props,{emit}) {

    watch(props, () => {
      code.value = props.taskData.dataForPlugin.defaultCode;
    });

    onMounted(() => code.value = props.taskData.dataForPlugin.defaultCode)

    console.log("oni" + props)

    let code = ref(props.taskData.dataForPlugin.defaultCode);

    function highlighter(code) {
      return highlight(code, languages.js, "typescript"); // languages.<insert language> to return html with markup
    }

    function inputChanged (){
      emit('pluginChangedData', {...props.taskData, dataForPlugin:{defaultCode: code.value}})
    }

    return { code, highlighter, inputChanged };
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