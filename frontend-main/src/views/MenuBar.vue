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
import { ref, onMounted } from "vue"
export default {
  setup(){
    const menubarItems = ref([
      {
        label: 'Task Management', icon: 'pi pi-bookmark', code: 'test', command: (event) => {handleClickComponent(event)}
      },
      {
        label: 'Task Work', icon: 'pi pi-pencil', code: ''
      },
      {
        label: 'User Management', icon: 'pi pi-users', code: ''
      }
    ])

    function handleClickComponent(e){
      console.log(e.item.code)
    }
    return {
      menubarItems,
      handleClickComponent, 
    }
  }
}
</script>

<style scoped>
.lestSide {
  background-color: aqua;
}
</style>