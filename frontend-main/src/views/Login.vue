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
import { useRouter } from 'vue-router'
import VueCookies from 'vue-cookies'
export default {
  name: 'Login',

  setup() {
    const username = ref('');
    const password = ref('');
    const router = useRouter();
    const User = require('../models/loginUserDTO');
    const axios = require("axios");
    const headers = {
      'Content-Type': 'application/json',
      }

    async function handleLogin(){
      if(username.value && password.value){
        const user = new User(username.value, password.value)
        console.log(user)
        //const resp = await axios.post('http://localhost:3000/auth/login', user, {headers: headers});
        axios.post('http://localhost:3000/auth/login', user, {headers: headers}).then(response => {
          console.log(response.data.access_token);
          VueCookies.set('access-token', 'Bearer '+response.data.access_token, '1min')
          //localStorage.setItem('token', response.data.accses_token)
          router.push('/');
        }).catch(error => {
          if(error.response.status === 401) {
            console.log("Benutzername oder Passwort falsch")
          } else {
            console.log("IWAS")
          }
        })
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