<template>
<!-- <prism-editor
      class="solve-editor"
      v-model="code"
      :highlight="highlighter"
      line-numbers
    ></prism-editor> -->
<div>oiajfoaisdfjo</div>
</template>
<script>
import { PrismEditor } from "vue-prism-editor";
import "vue-prism-editor/dist/prismeditor.min.css"; // import the styles somewhere

// import highlighting library (you can use any library you want just return html string)
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css"; // import syntax highlighting styles

import {ref} from "vue"

export default {
  components: {
    PrismEditor,
  },
  props: {
    data: { defaulCode:String },
  },
  setup(props) {
    let code = ref(props.data.defaulCode);

    return{code};
  },
};
</script>