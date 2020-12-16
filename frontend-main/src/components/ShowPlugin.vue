<template>
  <div>
    <component :is="inscopePlugin"></component>
    <p @update='console.log("oiasnd")'>{{state.plugin}}</p>
  
  </div>
</template>

<script>

import { useState } from '../store/store';
import VueCookies from 'vue-cookies';
import { h, ref, reactive, defineAsyncComponent, onMounted, Vue, watch, watchEffect } from 'vue';

//import {Vue, watch, watchEffect} from 'vue';

  
//   let outscopePlugin = defineAsyncComponent(() => import("@/" + useState().plugin));
//   console.log(outscopePlugin)

//   function reloadComponent(plugin){
//     console.log(outscopePlugin)
//     console.log("Component (re-) loaded")
//     // console.log((await import("@/" + plugin)).default)
//     // console.log("@/" + useState().plugin)
//     return(defineAsyncComponent(() => import("@/" + plugin)));
//     // return(defineAsyncComponent(() => import("@/" + useState().plugin)))
//   }

//   export function testtest() {
//   console.log('testest Geht')
// }

    // watch(useState(),(plugin) => {
    //     console.log("state.plugin")
    //     // console.log(inscopePlugin)
    //     console.log(reloadComponent(state.plugin))
    //     inscopePlugin = outscopePlugin;
    // })


  export default {
    setup() {
      let state = useState();
      // let inscopePlugin = ref({});
      const inscopePlugin = ref(defineAsyncComponent(() => import("@/" + state.plugin)))
/*       let inscopePlugin = defineAsyncComponent(() => import("@/" + state.plugin));
      console.log(inscopePlugin) */
      // reloadComponent();

    // watch(state,(plugin) => {
    //   this.asd();
    //   reloadComponent();
    //   console.log("okn")
    //   inscopePlugin = outscopePlugin;
    // })
      watch(state,(plugin) => {
        console.log(state.plugin)
        //inscopePlugin = null
        inscopePlugin.value = defineAsyncComponent(() => import("@/" + state.plugin));
        console.log(inscopePlugin.value)
        // console.log(reloadComponent(state.plugin))
        // inscopePlugin = outscopePlugin;
    })
      return { 
        state,
        // plugins,
        inscopePlugin
      };
    },
    // methods:{
    //   asd(){
    //     console.log("poksdmf")
    //   },

    //   handleChangeComponent(e){
    //     console.log("oseanif")
    //     // this.state.plugin = e.value.code;
    //     reloadComponent();
    //     this.inscopePlugin = outscopePlugin;
    //   },


    // watch(state){
    //   console.log("spodkfm")
    //   reloadComponent();
    //   this.inscopePlugin = outscopePlugin;
    // }

      // watch(
      //   () => this.state.count,
      //   (count, prevCount) => {
      //     /* ... */
      //   }
      // )
    // }
/*     data () {
      return {
      state: useState(),
      }
    },
    watch:{
      state: function (val){
        console.log("qwertzui")
      }
    } */

  };


</script>