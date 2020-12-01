<template>
  <div>
    <div>
      <div v-if="!state.user">
        <Menu :model="logedOutItems" />
      </div>
      <div v-else>
        <Menu :model="logedInItems" />
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
        label: 'Login', icon: 'pi pi-fw pi-login', to: '/login',
    },
    {
        label: 'Signup', icon: 'pi pi-fw pi-sigup', to: '/signup',
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
        label: 'Test', icon: 'pi pi-fw pi-home', to: '/test',
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