<template>
  <div class="getTask">
    <h2>GetTask</h2>
    <div>
      <span class="p-input-icon-left">
        <i class="pi pi-search" />
        <InputText type="text" v-model="searchParameter" placeholder="Search" />
      </span>
      <Button label='Search for Task' @click="displayListOfTasks"/>
    </div>
    <div>
      <Listbox v-model="selectedTask" :options="listTasks" optionLabel="name" optionValue='code' listStyle="max-height:250px" style="width:15em" v-on:change="handleClickComponent($event)"/>
    </div>
  </div>
</template>

<script>
import { ref } from "vue"
import VueCookies from 'vue-cookies'
import { useState } from '../store/store'

export default {
  name: 'getTask',

  setup(){
    /** InputText Variables */
    const searchParameter = ref('')
    const task = ref('')
    const listTasks = ref([])
    const selectedTask = ref('')

    /** System Variables */
    const axios = require("axios");
    const axiosAuthHeader = {
      'Content-Type': 'application/json',
      'Authorization': VueCookies.get('access-token')
    }
    let state = useState()

    /** Class Variables */
    let testTasks = [{name: 'Mathe 1', code: 3}, {name: 'Deutsch 1', code: 2}]
    /** Functions */  

/*     async function getTask(){
      const params = {searchParams: searchParameter.value}
      const resp = await axios.get('http://localhost:3000/task', {params}, {headers: axiosAuthHeader})
      displayListOfTasks(resp.data)
    } */

/*     function displayTasks(tasks){
      listTasks.value = []
      tasks.forEach(task => {
        listTasks.value.push({name: task.title, code: task._id})
      })
    } */

    function displayListOfTasks(){
      listTasks.value = []
      console.log(searchParameter.value)
      console.log(listTasks.value)
      testTasks.forEach(task => {
        listTasks.value.push({name: task.name, code: task.code})
      })
      console.log(listTasks.value)
    }
    
    function handleClickComponent(e){
      console.log(e.value)
      state.taskId = e.value
      console.log(state.taskId)
    }
    return {
      searchParameter,
      listTasks,
      selectedTask,
      displayListOfTasks,
      handleClickComponent,
    }
  }
}
</script>