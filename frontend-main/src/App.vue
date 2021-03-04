<template>
  <div id="app">
    <div v-if="!this.$route.path.includes('/solvefullscreen')">
    <GlobalNavBar />
    </div>
    <div class="auth-wrapper">
      <div class="auth-inner">
        <Toast />
      <!-- {{this.$route}} -->

        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import GlobalNavBar from "./views/GlobalNavBar";
import { useRoute } from 'vue-router'


export default {
  name: "App",
  components: {
    GlobalNavBar,
  },
  setup(){
        const route = useRoute()

  return{route}
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.body {
  margin: 0px;
}
</style>
