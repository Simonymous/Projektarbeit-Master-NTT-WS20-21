<template>
  <div id="app">
    <NavBar />
  

 <div class="auth-wrapper">
    <div class="auth-inner">
      <router-view/>
    </div>
  </div> 
</div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
//import UserSettings from './components/UserSettings.vue'
import NavBar from './views/NavBar'

export default {
  name: 'App',
  components: {
    //HelloWorld,
    //UserSettings,
    NavBar,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
