<template>
  <form @submit.prevent="handleLogin">
    <h3> Login </h3>

    <div class="form-group">
      <label> Username </label>
      <input v-model="username" placeholder="Username" id="username" autocomplete="on">
    </div>

     <div class="form-group">
      <label> Password </label>
      <input v-model="password" placeholder="Password" id="password" autocomplete="on">
    </div>

    <button name="login" class="button">Login</button>
  </form>

</template>
<script>
import { ref } from "vue"
export default {
  name: 'Login',

  setup() {
    const username = ref('');
    const password = ref('');
    const User = require('../components/user');
    const axios = require("axios");
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': '....'
      }

    async function handleLogin(){
      if(username.value && password.value){
        const user = new User(username.value, password.value)
        console.log(user)
        //const resp = await axios.post('http://localhost:3000/auth/login', user, {headers: headers});

        //localStorage.setItem('token', resp.data.token)
        this.$router.push("/");
      }
    }

    return {
      username,
      password,
      handleLogin,
    }
  }

}


</script>