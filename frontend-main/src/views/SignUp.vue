<template>
  <form>
    <h3>Sign Up</h3>
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
          <span class="p-inputgroup-addon">
            <i class="pi pi-envelope"></i>
          </span>
          <InputText
            v-model="email"
            placeholder="E-Mail"
            id="email"
            autocomplete="on"
          />
        </div>
      </div>
      <div class="p-col-12 p-md-4">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
            <i class="pi pi-key"></i>
          </span>
          <Password
            v-model="password"
            placeholder="Password"
            id="password"
            autocomplete="on"
          ></Password>
        </div>
      </div>
    </div>
    <Button
      label="Sign Up"
      name="signup"
      class="button"
      @click="startSignupProcess"
      icon="pi pi-sign-in"
      iconPos="left"
    />
  </form>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { postBackendRequest } from "../helper/requests";

export default {
  name: "Signup",

  setup() {
    const username = ref("")
    const password = ref("")
    const email = ref("")
    const router = useRouter()
    const USER_TEMPLATE = require("../models/signupUserDTO")
    const REGISTER_PATH = "auth/register"

    async function startSignupProcess() {
      try {
        if (username.value && password.value && email.value) {
          const user = new USER_TEMPLATE(username.value, email.value, password.value);
          const response = postBackendRequest(REGISTER_PATH, user);
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    }

    return {
      username,
      password,
      email,
      startSignupProcess,
    };
  },
};
</script>