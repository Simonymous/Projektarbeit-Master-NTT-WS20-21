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
    <show-plugin />
    <div class='createTaskFooter'>
      <Button label='Save' v-on:click='saveChangedTask'></Button>
      <Button label='Delete'></Button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import VueCookies from 'vue-cookies';
import { useState } from '../store/store';
import TaskWork from './TaskWork';
import ShowPlugin from './ShowPlugin.vue';

export default {
  name: 'manageTask',
  components: {
    ShowPlugin,
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
    const axios = require('axios');
    const axiosAuthHeader = {
      'Content-Type': 'application/json',
      Authorization: VueCookies.get('access-token'),
    };
    const Task = require('../models/taskDTO');
    let state = useState();

    /** Class Variables */
    const backendresponse = ref('');
    const task = ref('');

    /** Functions */
    async function saveChangedTask() {
      let newCreatedTask = newTask();
      console.log(newCreatedTask)
      await axios.post('http://localhost:3000/task', newCreatedTask, {
        headers: axiosAuthHeader,
      });
      clearInput();
    }

    async function updateTask() {
      let newUpdatedTask = newTask();
      if (state.taskId) {
        await axios.patch(selectTask(), newUpdatedTask, {
          headers: axiosAuthHeader,
        });
        clearInput();
      }
    }

    async function deleteTask() {
      await axios.delete(selectTask(), { headers: axiosAuthHeader });
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
      const selectedTaskRoot = 'http://localhost:3000/task/' + state.taskId;
      return selectedTaskRoot;
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