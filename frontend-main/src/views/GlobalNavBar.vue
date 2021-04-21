<template>
  <div>
    <div v-if="!loggedIn">
      <Menubar :model="MENUBAR_ITEMS_USER_NOT_LOGGED_IN" class="menubar" />
    </div>
    <div v-else>
      <Menubar :model="MENUBAR_ITEMS_USER_LOGGED_IN" class="menubar" />
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { useState } from "../store/store";
import User from "../models/User";
import VueCookies from "vue-cookies";
import { useRouter, useRoute } from "vue-router";

export default {
  name: "GlobalNavBar",
  setup() {
    let state = useState();
    let router = useRouter();
    let route = useRoute();
    let loggedIn = ref(VueCookies.isKey("access_token"));

    watch(
      () => route.path,
      () => (loggedIn.value = VueCookies.isKey("access_token"))
    );

    const MENUBAR_ITEMS_USER_NOT_LOGGED_IN = [
      {
        label: "Home",
        icon: "pi pi-fw pi-home",
        to: "/",
      },
      {
        label: "Login",
        icon: "pi pi-fw pi-sign-in",
        to: "/login",
      },
      {
        label: "Signup",
        icon: "pi pi-fw pi-register",
        to: "/signup",
      },
    ];
    const MENUBAR_ITEMS_USER_LOGGED_IN = [
      {
        label: "Logged In: ",
      },
      {
        label: "Logout",
        icon: "pi pi-fw pi-power-off",
        command: (event) => {
          state.user = new User(null);
          VueCookies.remove("access_token");
          router.go();
        },
      },
      {
        label: "Home",
        icon: "pi pi-fw pi-home",
        to: "/",
      },
    ];

    return {
      state,
      MENUBAR_ITEMS_USER_NOT_LOGGED_IN,
      MENUBAR_ITEMS_USER_LOGGED_IN,
      VueCookies,
      loggedIn,
    };
  },
};
</script>

<style scoped>
.menubar {
  background-color: rgb(94, 202, 221);
}
</style>
