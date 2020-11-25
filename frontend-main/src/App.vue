<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-light fixed-top">
      <div class="container">
        <router-link to="/">Home</router-link>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link to="/login">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/signup">Signup</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>


  
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
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
//import UserSettings from './components/UserSettings.vue'

export default {
  name: 'App',
  components: {
    //HelloWorld,
    //UserSettings,
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
