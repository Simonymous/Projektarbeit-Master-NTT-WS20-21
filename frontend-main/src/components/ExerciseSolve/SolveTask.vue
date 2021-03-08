<template>
  <div class="solveTask">
    <div class="taskInputs">
      TaskID: {{ task._id }} Titel:{{ task.title }} Description:{{
        task.description
      }}
    </div>

    <show-plugin
      :taskData="task"
      :pluginMode="'solveTask'"
      @pluginChangedData="pluginChangedTask"
    />
    <div class="solveTaskFooter">
      <Button label="Test" v-on:click="testInput"></Button>
      <Button label="Submit" v-on:click="submitSolution"></Button>
    </div>
    <Toast />
  </div>
</template>

<script>
import { ref, watch } from "vue";
import VueCookies from "vue-cookies";
import { useState } from "../../store/store";
import ShowPlugin from "../ShowPlugin.vue";
import availablePlugins from "../Plugins/paths.json";
import {
  getBackendRequestDummy,
  postBackendRequestDummy,
} from "../../helper/dummyRequests";
import { getBackendRequest, postBackendRequest } from "../../helper/requests";
import TaskWorkVue from "../TaskWork.vue";
import { useToast } from "primevue/usetoast";

const PATHS = require("../../../config.json").URL_PATHS;

const TASK_PATH = PATHS.TASK_PATH;
const TEST_TASK_PATH = PATHS.TEST_TASK_PATH;
const SUBMIT_TASK_PATH = PATHS.SUBMIT_TASK_PATH;

export default {
  name: "solveTask",
  components: {
    ShowPlugin,
  },
  props: {
    taskID: String,
  },

  setup(props, { emit }) {
    let state = useState();
    let userInput = ref();
    const toast = useToast();

    let emptyTask = {
      _id: -1,
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

    const task = ref({ ...emptyTask });

    watch(
      () => props.taskID,
      () => init()
    );

    init();
    async function init() {
      console.log(props.taskID);
      task.value = await requestTask();
      console.log(task.value);
      state.plugin = task.value.pluginCode;
    }

    async function requestTask() {
      try {
        if (process.env.VUE_APP_BACKEND_ONLINE == "true") {
          return await getBackendRequest(TASK_PATH + "/" + props.taskID);
        } else {
          return getBackendRequestDummy(TASK_PATH + "/" + props.taskID);
        }
      } catch (error) {
        console.log(error);
      }
    }

    function pluginChangedTask(payload) {
      task.value = payload;
    }

    async function testInput() {
      let testResults;
      try {
        if (process.env.VUE_APP_BACKEND_ONLINE === "true") {
          testResults = await postBackendRequest(
            TEST_TASK_PATH + "/" + props.taskID,
            task.value.dataForPlugin
          );
        } else {
          testResults = postBackendRequestDummy(
            TEST_TASK_PATH + "/" + props.taskID,
            task.value.dataForPlugin
          );
        }

        openToasts(testResults);
      } catch (error) {
        console.log(error);
      }
    }

    async function submitSolution() {
      try {
        if (process.env.VUE_APP_BACKEND_ONLINE === "true") {
          await postBackendRequest(
            SUBMIT_TASK_PATH + "/" + props.taskID,
            task.value.dataForPlugin
          );
        }
        emit("taskSubmitted", { id: props.taskID });
      } catch (error) {
        console.log(error);
      }
    }

    function openToasts(dataArray) {
      console.log(dataArray);
      toast.removeAllGroups();
      toast.add({
        severity: "info",
        summary: "Info Message",
        detail: "Message Content",
        life: 3000,
      });

      dataArray.forEach((item) => {
        console.log(item);
        if (item.status === "success") {
          toast.add({
            severity: "success",
            summary: item.title,
            detail: item.detail,
            life: 3000,
          });
        } else if (item.status === "error") {
          toast.add({
            severity: "error",
            summary: item.title,
            detail: item.detail,
          });
        }
      });
    }

    return {
      testInput,
      submitSolution,
      task,
      pluginChangedTask,
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