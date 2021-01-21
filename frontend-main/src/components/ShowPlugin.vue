<template>
  <div>
    <component :is="inscopePlugin"></component>
    <p @update="console.log('oiasnd')">{{ state.plugin }}</p>
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
  setup() {
    let state = useState();
    const inscopePlugin = ref(defineAsyncComponent(() => import("@/" + state.plugin)));

    watch(state, (plugin) => {
      console.log(state.plugin);
      console.log(state);
      inscopePlugin.value = defineAsyncComponent(() => import("@/" + state.plugin));
      console.log(inscopePlugin.value);
    });
    return {
      state,
      inscopePlugin,
    };
  },
};
</script>
