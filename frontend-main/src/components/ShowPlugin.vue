<template>
  <div>
    <component :is="inscopePlugin" v-bind="$props" @updateReturnValue="emitToParentUpdateReturnValue"></component>
    {{asd}}
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

export default {
  props: {
    taskData: Object
  },
  setup(props, {emit}) {
    let state = useState();
    const inscopePlugin = ref(defineAsyncComponent(() => import("@/" + state.plugin)));

    watch(state, (plugin) => {
      console.log(state.plugin);
      console.log(state);
      inscopePlugin.value = defineAsyncComponent(() => import("@/" + state.plugin));
      console.log(inscopePlugin.value);
    });

    function emitToParentUpdateReturnValue(value){
      emit('updateReturnValue', value)
    }

    return {
      state,
      inscopePlugin,
      emitToParentUpdateReturnValue
    };
  },
};
</script>
