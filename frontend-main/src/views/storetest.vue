<template>
  <div>
    <dropdown v-model="selectedPlugin" :options="plugins" optionLabel="name" placeholder="Select a City" v-on:change="handleChangeComponent($event)" />

  <div :key="selectedCity">
    <component :is="inscopePlugin"></component>
    </div>

  </div>
</template>

<script>

import { useState } from '../store/store';
import VueCookies from 'vue-cookies';
import { h, ref, reactive, defineAsyncComponent, onMounted } from 'vue';

import Vue from 'vue';



  const pluginPath = require("../../config.json").pluginPath;
  let outscopePlugin = defineAsyncComponent(() => import("@/" + useState().plugin));

  function reloadComponent(){
    console.log("Component (re-) loaded")
    outscopePlugin = defineAsyncComponent(() => import("@/" + useState().plugin));
  }

  export default {
    setup() {
      let state = useState();

      const plugins= [
        {name: 'HelloWorld', code: 'components/HelloWorld.vue'},
        {name: 'ByeWorld', code: 'components/ByeWorld.vue'}
      ]

      let selectedPlugin = ref({name: 'HelloWorld', code: 'components/HelloWorld.vue'});
      let inscopePlugin = outscopePlugin;


      return { 
        state,
        plugins,
        selectedPlugin,
        inscopePlugin
      };
    },
    methods:{
      handleChangeComponent(e){
        this.state.plugin = e.value.code;
        reloadComponent();
        this.inscopePlugin = outscopePlugin;
      }
    }

  };


</script>