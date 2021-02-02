<template>
  <div class="manageTask">
    <div class="taskInputs">
      TaskID: {{task.ID}}
      Titel:<InputText type="text" v-model="task.title" placeholder="Titel" />
      Description:<InputText
        type="text"
        v-model="task.description"
        placeholder="Description"
      />
      Tags: <InputText
        type="text"
        v-model="task.tags"
        placeholder="Tags"
      />
      Course: <InputText
        type="text"
        v-model="task.course"
        placeholder="Course"
      />
      <!--       <InputText type='text' v-model='maxPoints' placeholder='Zeit' /> -->
      <!--       <InputText
        type='text'
        :style='{ width: '500px' }'
        v-model='category'
        placeholder='Category'
      /> -->

      <!--       <InputText type='text' v-model='tags' placeholder='Tags' /> -->
    </div>
    Plugin:<SelectPluginDropdown />

    <show-plugin />
    <div class="createTaskFooter">
      <Button label="Save" v-on:click="handleSaveClick"></Button>
      <Button label="Delete" v-on:click="handleDeleteClick"></Button>
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted } from "vue";
import VueCookies from "vue-cookies";
import { useState } from "../../store/store";
import ShowPlugin from "../ShowPlugin.vue";
import SelectPluginDropdown from "../SelectPluginDropdown";

import {
  getBackendRequest,
  postBackendRequest,
  deleteBackendRequest,
  putBackendRequest,
} from "../../helper/requests";

export default {
  name: "manageTask",
  components: {
    ShowPlugin,
    SelectPluginDropdown,
  },
  props: {
    taskID: Number,
  },
  setup(props) {
    const TASK_PATH = "task"
    const CREATE_TASK_PATH = "createTask";
    const UPDATE_TASK_PATH = "updateTask";
    const DELETE_TASK_PATH = "delete";
    const TaskModel = require("../../models/taskDTO");
    let state = useState();

    let emptyTask = {
      ID: -1,
      type: "task",
      pluginCode: "",
      title: "",
      tags: [],
      course: "",
      creator: "",
      description: "",
      openTests: [],
      closedTests: [],
      dataForPlugin: {},
      date: new Date(),
    }

    const task = ref({...emptyTask, title : "oisdnf"});



    // initialize();
    watch(() => props.taskID, (newValue, oldValue) => {
      if (newValue !== -1) {
        requestTask();
      }else{
        task.value = {...emptyTask, title : "ttt"};
      }

    })

    // function initialize() {
    //   console.log(props.taskID)

    // }

    async function requestTask() {
      try {
        // task.value = await getBackendRequest(TASK_PATH + "/" + props.taskID);
      } catch (error) {
        console.log(error);
      }
    }

    function handleSaveClick() {
      // console.log( task.value.ID)
      try {
        if (task.value.ID === -1) {
          postBackendRequest(CREATE_TASK_PATH, task.value);
        } else {
          postBackendRequest(UPDATE_TASK_PATH, task.value);
        }
      } catch (error) {
        console.log(error);
      }
    }

    function handleDeleteClick() {
      try {
        // deleteBackendRequest(DELETE_TASK_PATH + "/" + task.value.ID);
        task.value = {...emptyTask}
      } catch (error) {
        console.log(error);
      }
    }


    // /** Support Functions */
    // function clearInput() {
    //   category.value = '';
    //   title.value = '';
    //   tags.value = '';
    //   description.value = '';
    //   solution.value = '';
    //   maxPoints.value = 0;
    // }

    // function newTask() {
    //   task.value = new TaskModel(
    //     ID.value,
    //     type.value,
    //     pluginCode.value,
    //     dataForPlugin.value,
    //     title.value,
    //     tags.value,
    //     course.value,
    //     creator.value,
    //     description.value,
    //     openTests.value,
    //     closedTests.value,
    //     date.value
    //   );
    //   return task.value;
    // }

    // function selectTask() {
    //   const selectedTaskRoot = TASK_PATH + state.taskId;
    //   return selectedTaskRoot;
    // }

    // function displayTask(){
    //   title.value = state.selectedTaskObject.title
    //   description.value = state.selectedTaskObject.description
    //   maxPoints.value = state.selectedTaskObject.maxPoints
    // }

    return {
      /** InputText Variables */
      // category,
      // title,
      // tags,
      // description,
      // solution,
      // maxPoints,
      task,
handleSaveClick,
handleDeleteClick
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