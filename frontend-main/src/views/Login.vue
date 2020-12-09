<template>
  <form >
    <h3> Login </h3>

    <div class="p-grid p-fluid">
      <div class="p-col-12 p-md-4">
          <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
              <i class="pi pi-user"></i>
          </span>
        <InputText v-model="username" id="username" placeholder="Username" autocomplete="on" />
          </div>
      </div>

      <div class="p-col-12 p-md-4">
          <div class="p-inputgroup">
              <span class="p-inputgroup-addon">></span>
              <InputText type="password" v-model="password" placeholder="Password" id="password" autocomplete="on" />
          </div>
      </div>
  </div>

    <Button name="login" class="button" @click="handleLogin()">Login</Button>
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