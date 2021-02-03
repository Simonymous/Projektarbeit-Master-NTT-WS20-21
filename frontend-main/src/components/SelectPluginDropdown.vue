<template>
  <div>
    <Dropdown v-model="selectedPlugin" :options="plugins" optionLabel="label" placeholder="Select a Plugin" v-on:change="handleChangeComponent($event)" />
  </div>
</template>

<script>

import { useState } from '../store/store';
import VueCookies from 'vue-cookies';
import { h, ref, reactive, defineAsyncComponent, onMounted } from 'vue';
import plugins from './Plugins/paths.json'

import Vue from 'vue';

  // const pluginPath = require("../../config.json").pluginPath;
  // let outscopePlugin = defineAsyncComponent(() => import("@/" + useState().plugin));

  // function reloadComponent(){
  //   console.log("Component (re-) loaded")
  //   outscopePlugin = defineAsyncComponent(() => import("@/" + useState().plugin));
  // }

  export default {
    name: 'SelectPluginDropdown',
    setup() {
      let state = useState();

      // const plugins= [
      //   {name: 'HelloWorld', code: 'components/HelloWorld.vue'},
      //   {name: 'ByeWorld', code: 'components/ByeWorld.vue'},
      //   {name: 'BasicMathCreate', code: 'components/Plugins/BasicMath/create.vue'},
      //   {name: 'Grade', code: 'components/Plugins/Grade/resolve.vue'},
      //   {name: 'Code', code:'components/Plugins/Code/create.vue'}
      // ]

      let selectedPlugin = ref({"label": "Grade", "code": "gradeDemo", "path": "components/Plugins/Grade/resolve.vue"});
      // let inscopePlugin = outscopePlugin;

      function changePlugin(event){
this.state.plugin = event.value.code;
      }


      return { 
        state,
        plugins,
        selectedPlugin,
        // inscopePlugin,
        changePlugin
      };
    },
    // methods:{
    //   handleChangeComponent(e){
    //     this.state.plugin = e.value.code;
    //     reloadComponent();
    //     this.inscopePlugin = outscopePlugin;
    //   }
    // }

  };


</script>