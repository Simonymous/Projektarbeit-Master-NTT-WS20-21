<template>
  <div>
    <div v-if="!state.user?.isLoggedIn()">
      <Menubar :model="MENUBAR_ITEMS_USER_NOT_LOGGED_IN" class="menubar" />
    </div>
    <div v-else>
      <Menubar :model="MENUBAR_ITEMS_USER_LOGGED_IN" class="menubar" />
    </div>
  </div>
</template>

<script>
import { ref } from "vue"
import { useState } from "../store/store"
import VueCookies from "vue-cookies"

export default {
  name: "GlobalNavBar",
  setup() {
    let state = useState();
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
        items: [
          {
            label: "Logout",
            icon: "pi pi-fw pi-power-off",
            command: (event) => {
              VueCookies.remove("access-token");
              state.user = null;
            },
          },
        ],
      },
      {
        label: "Home",
        icon: "pi pi-fw pi-home",
        to: "/",
      },
    ]

    return {
      state,
      MENUBAR_ITEMS_USER_NOT_LOGGED_IN,
      MENUBAR_ITEMS_USER_LOGGED_IN,
    }
  },
}
</script>

<style scoped>
.menubar {
  background-color: rgb(94, 202, 221)
}
</style>