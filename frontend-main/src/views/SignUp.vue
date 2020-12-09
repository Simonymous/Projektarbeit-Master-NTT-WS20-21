<template>
  <form>
    <h3> Sign Up </h3>

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
          <span class="p-inputgroup-addon">
              <i class="pi pi-envelope"></i>
          </span>
              <InputText v-model="email" placeholder="E-Mail" id="email" autocomplete="on" />
          </div>
      </div>

            <div class="p-col-12 p-md-4">
          <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
              <i class="pi pi-key"></i>
          </span>
              <Password v-model="password" placeholder="Password" id="password" autocomplete="on"></Password>
          </div>
      </div>
  </div>

    <Button label="Sign Up" name="signup" class="button" @click="handleSignup" icon="pi pi-sign-in" iconPos="left"/>
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
    const User = require('../models/signupUserDTO');
    const axios = require("axios");
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': '....'
      }

    /** Bis jetzt nur User Login in User.js */
    async function handleSignup(){
      if(username.value && password.value && email.value){
        const user = new User(username.value, email.value, password.value)
/*         const user = {
          username: username.value,
          email: email.value,
          password: password.value,
        } */
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