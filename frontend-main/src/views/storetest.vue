<template>
  <div>
    <div>{{ state.counter }}</div>
    <button type="button" @click="test()">Increment</button>

    <dropdown v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Select a City" v-on:change="b($event)" />

  <div :key="selectedCity">
    <!-- <Plugin></Plugin> -->
    <component :is="Pluginn"></component>
    <p>{{selectedCity}}</p>
    </div>

  </div>
</template>

<script>

import { useState } from '../store/store';
import VueCookies from 'vue-cookies';
import { h, ref, reactive, defineAsyncComponent, onMounted } from 'vue';

import Vue from 'vue';



  const pluginPath = require("../../config.json").pluginPath;
  var Plugin = defineAsyncComponent(() => import("@/" + useState().plugin));

  function a(){
    console.log("ofdn")
    Plugin = defineAsyncComponent(() => import("@/" + useState().plugin));
  }

  a()

  export default {
    // components: {
    //   Plugin,
    // },
    setup() {
      let state = useState();

      var cities= [
        {name: 'HelloWorld', code: 'components/HelloWorld.vue'},
        {name: 'ByeWorld', code: 'components/ByeWorld.vue'}
      ]

      const selectedCity = ref({name: 'HelloWorld', code: 'components/HelloWorld.vue'});
        var Pluginn = Plugin;

    
      function test(e){
        console.log(selectedCity.value.code)
        console.log(state)
        state.counter++
        state.plugin = selectedCity.value.code;
        a();
        console.log(Plugin);
        Pluginn = Plugin;


      }


      return { state,
      test,
      cities,
      selectedCity,
      Pluginn
       };
    },
    methods:{
      async b(e){
        this.state.plugin = e.value.code;
        console.log(this.selectedCity.code);
        a();
        this.Pluginn = Plugin;
        console.log((await Plugin).setup().length);
        // this.$forceUpdate();
      }
    }

    
  };


//   const pluginPath = require("../../config.json").pluginPath;
// const Plugin = defineAsyncComponent(() => import("@/" + selectedCity.value.code));

</script>