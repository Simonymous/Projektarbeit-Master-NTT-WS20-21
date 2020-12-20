<template>
  <div class="taskWork">
    <h2>Test</h2>
    <div>
      <p> 
        {{taskTitle}}
        {{taskDescription}}
        {{taskPoints}}
      </p>
    </div>
    <div class="editor">
      <Editor v-model="taskInput" editorStyle="height: 320px" ba/>
    </div>
    <div>
      <Button label='Submit' @click="submitSolution"/>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeUpdate, watch } from "vue"
import VueCookies from 'vue-cookies'
import { useState } from '../store/store'

export default {
  name: 'taskWork',

  setup(){
    /** InputText Variables */

    /** Display Variables */
    const taskTitle = ref('')
    const taskDescription = ref('')
    const taskPoints = ref(0)
    //const taskTime = ref(Date)
    const taskInput = ref('')


    /** System Variables */
    const axios = require("axios");
    const axiosAuthHeader = {
      'Content-Type': 'application/json',
      'Authorization': VueCookies.get('access-token')
    }
    let state = useState()
    let taskSolution = ''
    /** Class Variables */


    /** Functions */ 

    async function searchTask(){
      //Search Query: 'attribut' : 'inhalt', bpsw: { "name":"test" } oder { "name":"test", "tag":"math" }
      const resp = await axios.post('http://localhost:3000/task/searchTask'+{headers: axiosAuthHeader})
    }

    async function getTaskContent(){
      const resp = await axios.get('http://localhost:3000/task/' + state.taskId, {headers: axiosAuthHeader})
      taskTitle.value = resp.date.title
      taskDescription.value = resp.date.description
      taskPoints.value = resp.date.maxPoints
    }

    async function submitSolution(){
      taskSolution = taskInput.value.slice(3, -4)
      let taskTesting = {id: state.taskId, solution: taskSolution}
      const resp = await axios.post('http://localhost:3000/testing', taskTesting, {headers: axiosAuthHeader})
      console.log(taskSolution)
    }
  
    watch(state,(hans,meiser) => {
      getTaskContent()
      console.log('test'+ state.taskId)
    })
    
    return{
      taskTitle,
      taskDescription,
      taskPoints,
      taskInput,
      submitSolution
    }
  }

}
</script>