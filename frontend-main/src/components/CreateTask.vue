<template>
  <div class="createTask">
    <h2>Task Management</h2>
    <div class="taskInputs">
      <InputText type="text" v-model="category" placeholder="Category" />
      <InputText type="text" v-model="title" placeholder="Titel"/>
      <InputText type="text" v-model="tags" placeholder="Tags"/>
      <InputText type="text" v-model="discription" placeholder="Discription"/>
      <InputText type="text" v-model="solution" placeholder="Solution"/>
      <InputText type="text" v-model="maxPoints" placeholder="maxPoints"/>
    </div>
    <div class="taskButtons">
      <Button label='Create Task' @click="createTask"/>
      <Button label='Update Task' @click="updateTask"/>
      <Button label='Delete Task' @click="deleteTask"/>
    </div>
    <GetTask/>
  </div>
</template>

<script>
import { ref } from "vue"
import VueCookies from 'vue-cookies'
import { useState } from '../store/store'
import GetTask from './GetTask.vue'

export default {
  name: 'createTask',
  components: {
    GetTask,
  },
  setup(){
    /** InputText Variables */
    const category = ref('')
    const title = ref('')
    const tags = ref([])
    const discription = ref('')
    const solution = ref('')
    const maxPoints = ref(0)

    /** System Variables */
    const axios = require("axios");
    const axiosAuthHeader = {
      'Content-Type': 'application/json',
      'Authorization': VueCookies.get('access-token')
    }
    const Task = require('../models/taskDTO');
    let state = useState()

    /** Class Variables */
    const backendresponse = ref('')
    const task = ref('')

    /** Functions */  
    async function createTask(){
      let newCreatedTask = newTask() 
      await axios.post('http://localhost:3000/task', newCreatedTask, {headers: axiosAuthHeader})
      clearInput()
    }

    async function updateTask(){
      let newUpdatedTask = newTask()
      if(state.taskId){
        await axios.patch(selectTask(), newUpdatedTask, {headers: axiosAuthHeader})
        clearInput()
      } 
    }

    async function deleteTask(){
      await axios.delete(selectTask(), {headers: axiosAuthHeader})
    }

    /** Support Functions */
    function clearInput(){
        category.value = ''
        title.value = ''
        tags.value = ''
        discription.value = ''
        solution.value = ''
        maxPoints.value = 0
    }

    function newTask(){
      task.value = new Task(
        category.value,
        title.value,
        tags.value,
        discription.value,
        solution.value,
        maxPoints.value
      )
      return task.value
    }

    function selectTask(){
      const selectedTaskRoot = "http://localhost:3000/task/" + state.taskId
      return selectedTaskRoot
    }

    return {
      /** InputText Variables */
      category,
      title,
      tags,
      discription,
      solution,
      maxPoints,

      /** Functions */
      createTask,
      updateTask,
      deleteTask,
    }
  }
  
}
</script>