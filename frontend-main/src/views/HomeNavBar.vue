<template>
  <div class="HomeNavBar">
    <h2>HTW Saar Coding Plattform</h2>
    <div class="TabMenu"> 
      <TabMenu :model="menubarItems" class="tabmenu" />
    </div>
  </div>
</template>

<script>
import TabMenu from 'primevue/tabmenu'
import { ref, onMounted, } from "vue"
import { useState } from '../store/store';
import { useRouter } from "vue-router";

export default {
  name: 'HomeNavBar',

  setup(){
    let state = useState()
    const router = useRouter();
    const menubarItems = ref([
      {
        label: 'Task Management', icon: 'pi pi-bookmark', code: 'components/TaskManagement.vue', component: 'TaskManagement', command: (event) => {handleClickComponent(event)}
      },
      {
        label: 'Task Work', icon: 'pi pi-pencil', code: 'components/TaskWork.vue', component: 'TaskWork', command: (event) => {handleClickComponent(event)}
      },
      {
        label: 'User Management', icon: 'pi pi-users', code: 'components/UserManagement.vue', component: 'UserManagement', command: (event) => {handleClickComponent(event)}
      }
    ])

    function handleClickComponent(e){
      let urlParams = new URLSearchParams(window.location.search);
      
      urlParams.set("entryPoint", e.item.component);
      console.log(urlParams.get('entryPoint'))
      router.push(window.location.pathname + "?" + new URLSearchParams(urlParams).toString());
      // router.push("/");
      state.component = e.item.code
    }
    return {
      menubarItems,
      handleClickComponent, 
      state,
    }
  }
}
</script>

<style scoped>
</style>