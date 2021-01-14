<template>
  <div id="app">
    <GlobalNavBar />
    <div class="auth-wrapper">
      <div class="auth-inner">
        <router-view/>
      </div>
    </div> 
  </div>
</template>

<script>

import GlobalNavBar from './views/GlobalNavBar'

export default {
  name: 'App',
  components: {
    GlobalNavBar,
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
