<template>
  <div class="manageTask">
    <div class="taskInputs">
      TaskID: {{ task.ID }} Titel:<InputText
        type="text"
        v-model="task.title"
        placeholder="Titel"
      />
      Description:<InputText
        type="text"
        v-model="task.description"
        placeholder="Description"
      />
      Tags:
      <InputText type="text" v-model="task.tags" placeholder="Tags" /> Course:
      <InputText type="text" v-model="task.course" placeholder="Course" />

    </div>
    Plugin:<SelectPluginDropdown />

    <show-plugin :taskData="task"  :pluginMode="'createTask'"/>
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
import { getBackendRequestDummy } from "../../helper/dummyRequests";

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
    const TASK_PATH = "task";
    const CREATE_TASK_PATH = "createTask";
    const UPDATE_TASK_PATH = "updateTask";
    const DELETE_TASK_PATH = "delete";
    const TaskModel = require("../../models/taskDTO");
    let state = useState();

    let emptyTask = {
      ID: -1,
      type: "task",
      pluginCode: "gradeDemo",
      title: "",
      tags: [],
      course: "",
      creator: "",
      description: "",
      openTests: [],
      closedTests: [],
      dataForPlugin: {},
      date: new Date(),
    };

    const task = ref({ ...emptyTask, title: "oisdnf" });

    // initialize();
    watch(
      () => props.taskID,
      () => initialize()
    );

    initialize();
    function initialize() {
      if (props.taskID === -1) {
        task.value = { ...emptyTask, title: "ttt" };
        state.plugin = task.value.pluginCode
      } else {
        requestTask();
      }
    }

    async function requestTask() {
      try {
        if (process.env.BACKEND_ONLINE) {
          task.value = await getBackendRequest(TASK_PATH + "/" + props.taskID);
        } else {
          task.value = getBackendRequestDummy(TASK_PATH + "/" + props.taskID);
        }

        state.plugin = task.value.pluginCode
      } catch (error) {
        console.log(error);
      }
    }

    function handleSaveClick() {
      // console.log( task.value.ID)
      try {
        task.value.pluginCode = state.plugin
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
        task.value = { ...emptyTask };
      } catch (error) {
        console.log(error);
      }
    }


    return {
      task,
      handleSaveClick,
      handleDeleteClick,
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