<template>
  <div class='manageTask'>
    <div class='taskInputs'>
      <InputText type='text' v-model='title' placeholder='Titel' />
      <InputText type='text' v-model='description' placeholder='Description' />
      <InputText type='text' v-model='maxPoints' placeholder='maxPoints' />
      <!--       <InputText type='text' v-model='maxPoints' placeholder='Zeit' /> -->
      <!--       <InputText
        type='text'
        :style='{ width: '500px' }'
        v-model='category'
        placeholder='Category'
      /> -->

      <!--       <InputText type='text' v-model='tags' placeholder='Tags' /> -->
    </div>
              <SelectPluginDropdown/>

    <show-plugin />
    <div class='createTaskFooter'>
      <Button label='Save' v-on:click='saveChangedTask'></Button>
      <Button label='Delete'></Button>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import VueCookies from 'vue-cookies';
import { useState } from '../../store/store';
import ShowPlugin from '../ShowPlugin.vue';
import SelectPluginDropdown from '../SelectPluginDropdown'

import { getBackendRequest, postBackendRequest, deleteBackendRequest, putBackendRequest } from "../../helper/requests";

export default {
  name: 'manageTask',
  components: {
    ShowPlugin,
    SelectPluginDropdown
  },
  setup() {
    /** InputText Variables */
    const category = ref('');
    const title = ref('');
    const tags = ref([]);
    const description = ref('');
    const maxPoints = ref(0);
    const solution = ref('')

    /** System Variables */
    const TASK_PATH = 'task'
    const Task = require('../../models/taskDTO');
    let state = useState();

    /** Class Variables */
    const task = ref('');

    /** Functions */
    async function saveChangedTask() {
      try{
        if(state.selectedTaskObject === null){
          let newCreatedTask = newTask();
          postBackendRequest(TASK_PATH, newCreatedTask)
          clearInput()
        }else{
          let updatedTask = updateTask()
          putBackendRequest(TASK_PATH, updatedTask)
          clearInput()
        }
      state.selectedTaskObject = null
      }catch(error){
        console.log(error)
      }
    }

    async function updateTask() {
      //state.selectedTaskObject.category = category.value
      state.selectedTaskObject.title = title.value
      //state.selectedTaskObject.tags = tags.value
      state.selectedTaskObject.description = description.value
      state.selectedTaskObject.maxPoints = maxPoints.value

      return state.selectedTaskObject
    }

    async function deleteTask() {
      try{
        deleteBackendRequest(selectTask())
      }catch(error){
        console.log(error)
      }
    }

    /** Support Functions */
    function clearInput() {
      category.value = '';
      title.value = '';
      tags.value = '';
      description.value = '';
      solution.value = '';
      maxPoints.value = 0;
    }

    function newTask() {
      task.value = new Task(
        category.value,
        title.value,
        tags.value,
        description.value,
        solution.value,
        maxPoints.value
      );
      return task.value;
    }

    function selectTask() {
      const selectedTaskRoot = TASK_PATH + state.taskId;
      return selectedTaskRoot;
    }
    
    function displayTask(){
      title.value = state.selectedTaskObject.title
      description.value = state.selectedTaskObject.description
      maxPoints.value = state.selectedTaskObject.maxPoints
    }


    return {
      /** InputText Variables */
      category,
      title,
      tags,
      description,
      solution,
      maxPoints,

      /** Functions */
      saveChangedTask,
      updateTask,
      deleteTask,
    };
  },
};
</script>

<style scoped>
.p-inputtext {
  margin: 5px;
}
button {
  margin: 5px;
}
</style>