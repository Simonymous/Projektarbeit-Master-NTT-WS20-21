<template>
  <div class="solveTask">
    <div class="taskInputs">
      TaskID: {{ task.ID }} Titel:{{task.title}} Description:{{task.description}}
    </div>

    <show-plugin :taskData="task" :pluginMode="'solveTask'" @pluginChangedData="pluginChangedTask"/>
    <div class="solveTaskFooter">
      <Button label="Test" v-on:click="testInput"></Button>
      <Button label="Submit" v-on:click="submitSolution"></Button>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import VueCookies from "vue-cookies";
import { useState } from "../../store/store";
import ShowPlugin from "../ShowPlugin.vue";
import availablePlugins from "../Plugins/paths.json";
import { getBackendRequestDummy, postBackendRequestDummy } from "../../helper/dummyRequests";
import {
  getBackendRequest,
  postBackendRequest,
} from "../../helper/requests";
import TaskWorkVue from '../TaskWork.vue';

const PATHS = require('../../../config.json').URL_PATHS;

const TASK_PATH = PATHS.TASK_PATH
const TEST_TASK_PATH = PATHS.TEST_TASK_PATH    
const SUBMIT_TASK_PATH = PATHS.SUBMIT_TASK_PATH

export default {
  name: "solveTask",
  components: {
    ShowPlugin,
  },
  props: {
    taskID: Number
  },

  setup(props) {
    let state = useState();
    let userInput = ref();


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

    const task = ref({...emptyTask})


    init()
    async function init(){
      task.value = await requestTask()
      state.plugin = task.value.pluginCode
    }

    async function requestTask() {
      try {
        if (process.env.BACKEND_ONLINE) {
          return await getBackendRequest(TASK_PATH + "/" + props.taskID);
        } else {
          return getBackendRequestDummy(TASK_PATH + "/" + props.taskID);
        }
      } catch (error) {
        console.log(error);
      }
    }

    function pluginChangedTask(payload){
      task.value = payload;
    }


    async function testInput() {
      try {
        if (process.env.BACKEND_ONLINE) {
          return await postBackendRequest(TEST_TASK_PATH + "/" + props.taskID, task.value.dataForPlugin);
        } else {
          return postBackendRequestDummy(TEST_TASK_PATH + "/" + props.taskID, task.value.dataForPlugin);
        }
      } catch (error) {
        console.log(error);
      }
    }

    async function submitSolution() {
      try {
        const response = await postBackendRequest(SUBMIT_TASK_PATH + "/" + props.taskID, task.value.dataForPlugin);
      } catch (error) {
        console.log(error);
      }
    }

    return {
      testInput,
      submitSolution,
      task,
      pluginChangedTask
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