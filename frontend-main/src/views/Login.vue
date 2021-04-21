<template>
  <form>
    <h3>Login</h3>
    <div class="p-grid p-fluid">
      <div class="p-col-12 p-md-4">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-user"></i>
          </span>
          <InputText
            v-model="username"
            id="username"
            placeholder="Username"
            autocomplete="on"
          />
        </div>
      </div>
      <div class="p-col-12 p-md-4">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">></span>
          <InputText
            type="password"
            v-model="password"
            placeholder="Password"
            id="password"
            autocomplete="on"
          />
        </div>
      </div>
    </div>
    <Button name="login" class="button" @click="startLoginProcess()"
      >Login</Button
    >
  </form>
</template>
<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import VueCookies from "vue-cookies";
import { postBackendRequest } from "../helper/requests";
import { useState } from "../store/store";
import User from '../models/User'
export default {
  name: "Login",

  setup() {
    const username = ref("");
    const password = ref("");
    const router = useRouter();
    const USER_TEMPLATE = require("../models/loginUserDTO");
    const AUTH_PATH = "auth/login";
    let state = useState();
    

    async function startLoginProcess() {
      try {
        if (username.value && password.value) {
          const user = new USER_TEMPLATE(username.value, password.value);
          const response = await postBackendRequest(AUTH_PATH, user);
          state.user = new User(response.token.accessToken);
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    }

    return {
      username,
      password,
      startLoginProcess,
    };
  },
};
</script>