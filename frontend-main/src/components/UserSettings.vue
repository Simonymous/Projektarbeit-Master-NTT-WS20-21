<template>
  <div class="UserSettings">
    <fieldset>
      <dl class="form">
        <dd>
          <input v-model="username" placeholder="Username" id="username" autocomplete="on">
        </dd>
      </dl>
      <dl class="form">
        <dd>
          <input v-model="password" placeholder="Password" id="password" autocomplete="on">
        </dd>
      </dl>
     <!-- <dd>
        <button name="moodel" class="button" v-on:click="loginWithMoodel">Moodel</button>
      </dd>-->
      <p>
        <a href="">I forgot my Password</a>
      </p>
      <div class="login-reg">
        <button name="login"  class="button" v-on:click="login">Login</button> 
      </div>
      </fieldset>

    <fieldset>
      <dl class="form">
        <dd>
          <input v-model="username" placeholder="Username" id="username" autocomplete="on">
        </dd>
      </dl>
      <dl class="form">
        <dd>
          <input v-model="email" placeholder="E-Mail" id="email" autocomplete="on">
        </dd>
      </dl>
      <dl class="form">
        <dd>
          <input v-model="password" placeholder="Password" id="password" autocomplete="on">
        </dd>
      </dl>
      <div class="register-reg">
        <button name="register"  class="button" v-on:click="register">Register</button> 
      </div>
    </fieldset>
  </div>
  
</template>
<script>
//import Home from '../views/Home.vue'
//import Login from '../views/Login.vue'
import { ref } from "vue"
export default {
  name: "UserSettings",
  components: {
  //  Home,
    //Login,
  },

  setup(){
    const username = ref("");
    const password = ref("");
    const email = ref("");
    const axios = require("axios");
    const User = require("./user.js")
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': '....'
      }


    async function login(){
      if(username.value && password.value) {
        console.log("Hallo" + " " + username.value)
        const user = new User(username.value, password.value) 
        console.log(user)
        const resp = await axios.post('http://localhost:3000/auth/login', user, {headers: headers});
        console.log(resp)
        //return resp.data; 
      }
    }

    async function register(){
      if(username.value && password.value && email.value) {
        const user = new User(username.value, email.value, password.value)
        console.log(user)
/*         const resp = await axios.post('', user, {headers: headers});
        return resp.data;  */
      }
    }

    return {
      username,
      password,
      email,
      login,
      register,

    }
  }
}
</script>
<style scoped>
  .moodel {
    background-color: blue;
  }
</style>