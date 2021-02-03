<template>
  <div>
    <!-- <component :is="inscopePlugin" v-bind="$props" @updateReturnValue="emitToParentUpdateReturnValue"></component> -->
    {{ asd }}
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

export default {
  props: {
    taskData: Object,
  },
  setup(props, { emit }) {
    let state = useState();
    const inscopePlugin = ref(
      defineAsyncComponent(() => getSelectedPluginPath())
    );
    console.log(getSelectedPluginPath());

    watch(state, (plugin) => {
      console.log(state.plugin);
      console.log(state);
      inscopePlugin.value = defineAsyncComponent(() => getSelectedPluginPath());
      console.log(inscopePlugin.value);
    });

    function emitToParentUpdateReturnValue(value) {
      emit("updateReturnValue", value);
    }

    async function getSelectedPluginPath() {
      let plugins_Path = "components/Plugins";

      let pluginConfigPath =
        plugins_Path +
        plugins.find((plugin) => plugin.code == state.plugin).path;
      console.log(pluginConfigPath);
      // let test1 = "Code";
      // let test = "@/components/Plugins/Code/config.json";
      // let test2 = "components/Plugins/Code/config.json"
      // let bla = await console.log(require("@/components/Plugins/"+test1+"/config.json"))
      // let bla = () => import(test);+
      let pluginConfig = require("@/" + pluginConfigPath)
      let plugin = require("@/" + plugins_Path + pluginConfig.createTask) 
      // console.log(plugins_Path + require(plugins_Path + (plugins.find((plugin)=>plugin.code==state.plugin)).path).createTask)
      // (plugins.where((plugin)=>plugin.code==state.plugin)).path
      // return("@/components/Plugins" + (plugins.find((plugin)=>plugin.code==state.plugin)).path)
      return plugin
    }

    return {
      state,
      inscopePlugin,
      emitToParentUpdateReturnValue,
    };
  },
};
</script>
