<template>
    <h2>User Status</h2>
    <p v-if="state.user">User is Logged In</p>
    <button type="button" @click="logout()">Logout</button>

</template>

<script>

import { useState } from '../store/store';

  export default {
    setup() {
      let state = useState()
      
      function logout(){
        localStorage.removeItem('token')
        state.user = null
        console.log(state.user)
      }
      return { state, logout
      };
    }
  };

</script>