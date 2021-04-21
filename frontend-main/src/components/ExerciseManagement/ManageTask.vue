<template>
  <div class="manageTask">
    <div class="taskInputs p-grid">
      <div class="p-col-12 p-md-6 p-lg-3">
        <span class="p-float-label">
          <InputText type="text" v-model="task._id" id="ID" disabled="true" />
          <label for="ID">ID</label>
        </span>
      </div>
      <div class="p-col-12 p-md-6 p-lg-3">
        <span class="p-float-label">
          <InputText type="text" v-model="task.title" id="Titel" />
          <label for="Titel">Titel</label>
        </span>
      </div>
      <div class="p-col-12 p-md-6 p-lg-3">
        <span class="p-float-label">
          <InputText type="text" v-model="task.tags" id="Tags" />
          <label for="Tags">Tags</label>
        </span>
      </div>
      <div class="p-col-12 p-md-6 p-lg-3">
        <span class="p-float-label">
          <InputText type="text" v-model="task.course" id="Course" />
          <label for="Course">Course</label>
        </span>
      </div>
      <div class="p-col-12">
        <span class="p-float-label">
          <Textarea
            v-model="task.description"
            id="Description"
            rows="5"
            cols="60"
          />
          <label for="Description">Description</label>
        </span>
      </div>
    </div>
    <div class="pluginSelect">
      <div class="p-text-center">Center:</div>
      <SelectPluginDropdown />
    </div>

    <show-plugin
      :taskData="task"
      :pluginMode="'createTask'"
      @pluginChangedData="pluginChangedTask"
    />
    <div class="createTaskFooter">
      <Button label="Save" v-on:click="handleSaveClick"></Button>
      <Button
        label="Delete"
        v-on:click="handleDeleteClick"
        class="p-button-danger"
      ></Button>
      <Button label="Export" v-on:click="handleExportClick"></Button>
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
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";

import {
  getBackendRequest,
  postBackendRequest,
  deleteBackendRequest,
  putBackendRequest,
} from "../../helper/requests";
import { useConfirm } from "primevue/useconfirm";
const fs = require("fs");

const PATHS = require("../../../config.json").URL_PATHS;

const TASK_PATH = PATHS.TASK_PATH;
const CREATE_TASK_PATH = PATHS.CREATE_TASK_PATH;
const UPDATE_TASK_PATH = PATHS.UPDATE_TASK_PATH;
const DELETE_TASK_PATH = PATHS.DELETE_TASK_PATH;
const TASK_GET_LINKED_TASK_COLLECTIONS = PATHS.TASK_GET_LINKED_TASK_COLLECTIONS;

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
    const TaskModel = require("../../models/taskDTO");
    let state = useState();
    const confirm = useConfirm();
    const router = useRouter();
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
        state.plugin = task.value.pluginCode;
      } else {
        requestTask();
      }
    }

    async function requestTask() {
      try {
        if (process.env.VUE_APP_BACKEND_ONLINE === "true") {
          task.value = await getBackendRequest(TASK_PATH + "/" + props.taskID);
        } else {
          task.value = getBackendRequestDummy(TASK_PATH + "/" + props.taskID);
        }

        state.plugin = task.value.pluginCode;
      } catch (error) {
        toast.add({
          severity: "error",
          summary: error.message,
          life: 10000,
        });
      }
    }

    async function handleSaveClick() {
      try {
        task.value.pluginCode = state.plugin;
        if (task.value._id === -1) {
          await postBackendRequest(CREATE_TASK_PATH, task.value);
          router.go();
        } else {
          console.log(task.value);
          await putBackendRequest(UPDATE_TASK_PATH, task.value);
          router.go();
          toast.add({
            severity: "success",
            summary: "Task wurde gespeichert",
            life: 10000,
          });
        }
      } catch (error) {
        toast.add({
          severity: "error",
          summary: error.message,
          life: 10000,
        });
      }
    }

    async function handleDeleteClick() {
      try {
        let linkedTaskCollections = await getBackendRequest(
          TASK_GET_LINKED_TASK_COLLECTIONS + "/" + props.taskID
        );
        let message = "Möchten sie den Task löschen?";
        message = linkedTaskCollections.length
          ? message +
            "\n Die Aufgabe ist in folgenden Aufgabenblättern vorhanden und wird herausgelöscht: \n"
          : message;

        linkedTaskCollections.forEach((taskCollection) => {
          message += "\r\n " + taskCollection.title;
        });

        confirm.require({
          message: message,
          header: "Task löschen",
          icon: "pi pi-exclamation-triangle",
          accept: async () => {
            console.log(
              (await deleteBackendRequest(
                DELETE_TASK_PATH + "/" + task.value._id
              )) + "fghjk"
            );
            console.log("after delete");
            task.value = { ...emptyTask };
            router.go();
            toast.add({
              severity: "success",
              summary: "Task wurde gelöscht",
              life: 10000,
            });
          },
        });
      } catch (error) {
        toast.add({
          severity: "error",
          summary: error.message,
          life: 10000,
        });
      }
    }

    function handleExportClick() {
      const data = JSON.stringify([task.value]);
      const blob = new Blob([data], { type: "application/json" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = task.value.title + "-" + task.value._id;
      link.click();
      URL.revokeObjectURL(link.href);
      toast.add({
        severity: "success",
        summary: "Task wurde exportiert",
        life: 10000,
      });
    }

    function pluginChangedTask(payload) {
      task.value = payload;
    }

    return {
      task,
      handleSaveClick,
      handleDeleteClick,
      pluginChangedTask,
      handleExportClick,
    };
  },
};
</script>

<style scoped>
.p-inputtext {
  width: 100%;
}
button {
  margin: 5px;
}
.taskInputs {
  padding-top: 15px;
}

.p-float-label {
  margin-top: 15px;
}

.pluginSelect {
  display: flex;
  justify-content: center;
  padding: 5px;
  align-items: center;
}

.p-text-center {
  padding: 5px;
}
</style>
