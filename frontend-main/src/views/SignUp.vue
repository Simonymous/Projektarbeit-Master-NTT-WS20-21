<template>
  <form @submit.prevent="handleSignup">
    <h3> Sign Up </h3>

    <div class="form-group">
      <label> Username </label>
      <input v-model="username" placeholder="Username" id="username" autocomplete="on">
    </div>

    <div class="form-group">
      <label> Email </label>
      <input v-model="email" placeholder="Email" id="email" autocomplete="on">
    </div>

     <div class="form-group">
      <label> Password </label>
      <input v-model="password" placeholder="Password" id="password" autocomplete="on">
    </div>

    <button name="signup" class="button">Sign Up</button>
  </form>
</template>
<script>
import { ref } from "vue"
import { useRouter } from 'vue-router'
export default {
  name: 'Signup',

  setup() {
    const username = ref('');
    const password = ref('');
    const email = ref('');
    const router = useRouter();
    const User = require('../components/user');
    const axios = require("axios");
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': '....'
      }

    /** Bis jetzt nur User Login in User.js */
    async function handleSignup(){
      if(username.value && password.value && email.value){
        //const user = new User(username.value, email.value, password.value)
        const user = {
          username: username.value,
          email: email.value,
          password: password.value,
        }
        console.log(user)
        const resp = await axios.post('http://localhost:3000/auth/register', user, {headers: headers});
      }
      router.push('/')
    }

    return {
      username,
      password,
      email,
      handleSignup,
    }
  }

}
</script>