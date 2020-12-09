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
      <Button label='Update Task'/>
      <Button label='Delete Task'/>
    </div>
  </div>
</template>

<script>
import { ref } from "vue"
import VueCookies from 'vue-cookies'

export default {
  name: 'createTask',
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

    /** Class Variables */
    const backendresponse = ref("")
    const task = ref("")

    /** Functions */  
    async function createTask(){
      task.value = new Task(
        category.value,
        title.value,
        tags.value,
        discription.value,
        solution.value,
        maxPoints.value
      )
      console.log(task.value)

      await axios.post('http://localhost:3000/task', task.value , axiosAuthHeader)
      clearInput()
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
    }
  }
  
}
</script>