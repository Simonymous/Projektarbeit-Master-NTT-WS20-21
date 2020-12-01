<template>
  <div v-if="!state.user">
    <Menubar :model="loggedOutItems" />
  </div>
  <div v-else>
    <Menubar :model="loggedInItems"></Menubar>
  </div>
  
</template>

<script>
import { ref } from 'vue'
import { useState } from '../store/store';
export default {
  setup() {
    let state = useState()
    const loggedOutItems = ref([{  
        label: 'Home', icon: 'pi pi-fw pi-home', to: '/',
    },
    {
        label: 'Login', icon: 'pi pi-fw pi-login', to: '/login',
    },
    {
        label: 'Signup', icon: 'pi pi-fw pi-sigup', to: '/signup',
    },])

    const loggedInItems = ref([
      {  
        label: 'Home', icon: 'pi pi-fw pi-home', to: '/',
      },
      {
        label: 'User',
        items: [{ label: 'Settings', icon: 'pi pi-fw pi-cog', to: 'settings' },
                { label: 'Logout', icon: 'pi pi-fw pi-power-off', to: '/logout'}

        ]
      }
    ])

    return {
      loggedOutItems,
      loggedInItems,
      state,
    }
  }
}
</script>