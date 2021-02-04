<template>
  <div>
    <component :is="inscopePlugin" :taskData="taskData" @updateReturnValue="emitToParentUpdateReturnValue"></component>
  </div>
</template>

<script>
import { useState } from "../store/store";
import VueCookies from "vue-cookies";
import {
  h,
  ref,
  reactive,
  defineAsyncComponent,
  onMounted,
  Vue,
  watch,
  watchEffect,
  markRaw,
  shallowRef,
} from "vue";
import plugins from "./Plugins/paths.json";
import {pluginsPath} from "../../config.json";

export default {
  props: {
    taskData: Object,
    pluginMode: String,
  },
  setup(props, { emit }) {
    console.log(props.taskData)
    let state = useState();
    const inscopePlugin = ref(
      defineAsyncComponent(() => getSelectedPluginPath())
    );

    watch(state, (plugin) => {
      inscopePlugin.value = defineAsyncComponent(() => getSelectedPluginPath());
    });

    function emitToParentUpdateReturnValue(value) {
      emit("updateReturnValue", value);
    }

    async function getSelectedPluginPath() {
      let pluginConfigPath =
        pluginsPath +
        plugins.find((plugin) => plugin.code == state.plugin).path;
      let pluginConfig = require("@/" + pluginConfigPath);
      let plugin = require("@/" + pluginsPath + pluginConfig[props.pluginMode]);
      
      return plugin;
    }

    return {
      state,
      inscopePlugin,
      emitToParentUpdateReturnValue,
    };
  },
};
</script>
