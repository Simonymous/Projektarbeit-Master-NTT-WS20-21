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
        label: 'Task Management', icon: 'pi pi-bookmark', code: 'components/TaskManagement.vue', command: (event) => {handleClickComponent(event)}
      },
      {
        label: 'Task Work', icon: 'pi pi-pencil', code: 'TaskWork' , command: (event) => {handleClickComponent(event)}
      },
      {
        label: 'User Management', icon: 'pi pi-users', code: 'userManagement' , command: (event) => {handleClickComponent(event)}
      }
    ])

    function handleClickComponent(e){
      let urlParams = new URLSearchParams(window.location.search);
      urlParams.set("entryPoint", e.item.code);
      console.log(urlParams)
      router.push(window.location.pathname + "?" + new URLSearchParams(urlParams).toString());
      // router.push("/");
      // state.component = e.item.code
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