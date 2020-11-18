<template>
  <img alt="Vue logo" src="./assets/philipp.jpg">
  <Suspense>
    <HelloWorld/>
  </Suspense>
    <Suspense>
    <UserSettings/>
  </Suspense>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import UserSettings from './components/UserSettings.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    UserSettings,
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
