<template>
  <div>
    <Dropdown
      v-model="selectedPlugin"
      :options="plugins"
      optionLabel="label"
      placeholder="Select a Plugin"
      v-on:change="handleChangeComponent($event)"
    />
  </div>
</template>

<script>
import { useState } from "../store/store";
import { onMounted, ref, watch } from "vue";
import plugins from "./Plugins/paths.json";

export default {
  name: "SelectPluginDropdown",
  setup() {
    let state = useState();

    let selectedPlugin = ref({
      label: "Grade",
      code: "gradeDemo",
      path: "components/Plugins/Grade/resolve.vue",
    });

    onMounted(() => setSelectedPlugin())

    watch(state, (plugin) => {
      setSelectedPlugin()
    });

    function setSelectedPlugin(){
      selectedPlugin.value = plugins.find(
        (plugin) => plugin.code == state.plugin
      );
    }

    function handleChangeComponent(event) {
      state.plugin = event.value.code;
    }

    return {
      state,
      plugins,
      selectedPlugin,
      handleChangeComponent,
    };
  },
};
</script>