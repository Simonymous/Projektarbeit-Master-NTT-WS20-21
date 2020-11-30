<template>
  <div>
    <div v-if="state.counter < 3">
      <Menu :model="logedOutItems" />
    </div>
    <div v-else>
      <Menu :model="logedInItems" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useState } from '../store/store';
import VueCookies from 'vue-cookies'
export default {
  setup() {
    let state = useState()
    const logedOutItems = ref([{  
        label: 'Home', icon: 'pi pi-fw pi-home', to: '/',
    },
    {
        label: 'Login', icon: 'pi pi-fw pi-login', to: '/login',
    },
    {
        label: 'Signup', icon: 'pi pi-fw pi-sigup', to: '/signup',
    },])

    const logedInItems = ref([
      {  
        label: 'Home', icon: 'pi pi-fw pi-home', to: '/',
      },
      {
        label: state.user,
        items: [{ label: 'Settings', icon: 'pi pi-fw pi-cog', to: 'settings' },
                { label: 'Logout', icon: 'pi pi-fw pi-power-off', command: (event) => {
                  VueCookies.remove('token')
                  state.user = null
                  state.user = "test"
                  console.log("Test")
                }}

        ]
      }
    ])

    return {
      logedOutItems,
      logedInItems,
      state,
    }
  }
}
</script>