<template>
  <div>
    <div>
      <div v-if="!state.user">
        <Menubar :model="logedOutItems" class="menubar"/>
      </div>
      <div v-else>
        <Menubar :model="logedInItems" class="menubar"/>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useState } from '../store/store'
import VueCookies from 'vue-cookies'
export default {
  setup() {
    let state = useState()
    //let userDisplay = state.user.user
    const logedOutItems = ref([{  
        label: 'Home', icon: 'pi pi-fw pi-home', to: '/',
    },
    {
        label: 'Login', icon: 'pi pi-fw pi-sign-in', to: '/login',
    },
    {
        label: 'Signup', icon: 'pi pi-fw pi-register', to: '/signup',
    },
    {
        label: 'Test', icon: 'pi pi-fw pi-sigup', to: '/test',
    },])

    const logedInItems = ref([
            {
        label: 'Eingeloggt: ',//+state.user.user,
        items: [{ label: 'Settings', icon: 'pi pi-fw pi-cog', to: 'settings' },
                { label: 'Logout', icon: 'pi pi-fw pi-power-off', command: (event) => {
                  VueCookies.remove('token')
                  state.user = null
                  state.counter = 2
                  console.log("Test")
                }}

        ]
      },
      {  
        label: 'Home', icon: 'pi pi-fw pi-home', to: '/',
      },
      {  
        label: 'Test', icon: 'pi pi-fw pi-sign-out', to: '/test',
      },
            {  
        label: 'User Managment', icon: 'pi pi-fw pi-home', to: '/userManagment',
      },
    ])

    return {
      logedOutItems,
      logedInItems,
      state,
    }
  }
}
</script>

<style scoped>
  .menubar {
  background-color: rgb(94, 202, 221);
}
</style>