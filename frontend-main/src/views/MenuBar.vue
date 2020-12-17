<template>
  <div class="MenuBar">
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
export default {
  setup(){
    let state = useState()
    const menubarItems = ref([
      {
        label: 'Task Management', /* to: '/taskManagement', */ icon: 'pi pi-bookmark', code: 'components/TaskManagement.vue', command: (event) => {handleClickComponent(event)}
      },
      {
        label: 'Task Work', icon: 'pi pi-pencil', code: 'components/TaskWork.vue' , command: (event) => {handleClickComponent(event)}
      },
      {
        label: 'User Management', icon: 'pi pi-users', code: 'views/userManagement.vue' , command: (event) => {handleClickComponent(event)}
      }
    ])

    function handleClickComponent(e){
      state.component = e.item.code
      console.log(state.component)
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