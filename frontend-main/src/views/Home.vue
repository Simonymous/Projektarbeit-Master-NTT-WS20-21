<template>
  <div v-if="state?.user?.isLoggedIn() || DEVMODE">
    <MenuBar/>
    <div>
      <component :is="inscopeComponent"></component>
    </div>
  </div>
  <div v-else>
    <img alt="Vue logo" src="../assets/philipp.jpg">
    <h1>Junge, du bist nicht angemeldet</h1>
    <h2>
      Willkommen auf der Startseite der HtW Saar Coding Plattform
    </h2>
  </div>
</template>

<script>
  import MenuBar  from './MenuBar'
  import { useState } from '../store/store'
  import { ref, onMounted, defineAsyncComponent, watch } from 'vue'
  import { getBackendRequest } from '../helper/requests'
  export default {
    name: 'home',
    components: {
      MenuBar,
    },
    setup(){
      const DEVMODE = process.env.NODE_ENV === 'development'

      const inscopeComponent = ref(defineAsyncComponent(() => import("@/" + state.component)))
      let state = useState()

      onMounted(getUserAndSetState())

      watch(state,(component) => {
        inscopeComponent.value = defineAsyncComponent(() => import("@/" + state.component));
      })

      async function getUserAndSetState(){
        try{
          state.user = await getBackendRequest('user')
        }catch(e){
          //Errorhandling
          console.log(e)
        }
      }

      return {
        state,
        getUserAndSetState,
        inscopeComponent,
        DEVMODE
      }
    }
  }
</script>