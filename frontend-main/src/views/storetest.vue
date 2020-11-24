<template>
  <div>{{ state.counter }}</div>
  <button type="button" @click="test()">Increment</button>
</template>

<script>

import { useState } from '../store/store';

  export default {
    setup() {
      let state = useState()
      function test(){
        console.log(state)
        state.counter++
      }
      return { state,
      test };
    }
  };

</script>