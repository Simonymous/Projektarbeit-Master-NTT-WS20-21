<template>
    <Suspense>
    <HelloWorld/>
  </Suspense>
</template>
<script>
  import HelloWorld from '../components/HelloWorld'
  export default {
    name: 'home',
    components: {
      HelloWorld,
    }
  }
</script>