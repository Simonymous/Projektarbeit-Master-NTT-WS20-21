<template>
  <div id="app">
    <NavBar />
  


  
<!--   <Suspense>
    <HelloWorld/>
  </Suspense> -->
<!--     <Suspense>
    <UserSettings/>
  </Suspense> -->
  <div class="auth-wrapper">
    <div class="auth-inner">
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/signup">Signup</router-link> |
      <router-link to="/test">Test</router-link> |
      <router-link to="/logout">Logout</router-link> |
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
}

</style>
