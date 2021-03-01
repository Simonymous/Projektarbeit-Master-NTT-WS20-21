<template>
  <Accordion :multiple="true" :activeIndex="activeTabs">
    <AccordionTab header="Task">
      <Button label="Create new Task" v-on:click="emitOpenTask()"></Button>
      <Listbox
        class="listbox"
        :options="listOfTasks"
        optionLabel="title"
        optionValue="_id"
        v-on:change="emitOpenTask($event.value)"
        listStyle="max-height:250px"
      />
    </AccordionTab>
    <AccordionTab header="Task Collection">
      <Button
        label="Create new TaskCollection"
        v-on:click="emitOpenTaskCollection()"
      ></Button>
      <div class="TaskCollectionAccordion">
        <Accordion v-on:tab-open="emitOpenTaskCollection(listOfTaskCollections[$event.index]._id)">
          <AccordionTab
            v-for="taskCollection in listOfTaskCollections"
            :key="taskCollection.title"
            :header="taskCollection.title"
          >
            <Listbox :options="taskCollection.tasks" optionLabel="title" optionValue="_id" v-on:change="emitOpenTask($event.value)"/>
          </AccordionTab>
        </Accordion>
      </div>
    </AccordionTab>
    <AccordionTab header="Import"> </AccordionTab>
  </Accordion>
</template>
<script>
import { ref, onMounted, watch } from "vue";
import { useState } from "../../store/store";
import {
  getBackendRequest,
  postBackendRequest,
  deleteBackendRequest,
  putBackendRequest,
} from "../../helper/requests";
import { getBackendRequestDummy } from "../../helper/dummyRequests";

const PATHS = require("../../../config.json").URL_PATHS;

const TASK_PATH = PATHS.TASK_PATH;
const TASK_COLLECTION_PATH = PATHS.TASK_COLLECTION_PATH;

export default {
  setup(props, { emit }) {
    let state = useState();
    const selectedTask = ref();
    const selectedTaskCollection = ref(0);

    const listOfTasks = ref();
    const listOfTaskCollections = ref();

    const activeTabs = ref([0, 1]);

    init();
    async function init() {
      listOfTasks.value = await requestTasks();
      listOfTaskCollections.value = await requestTaskCollections();
    }

    async function requestTasks() {
      try {
        if (process.env.VUE_APP_BACKEND_ONLINE === "true") {
          return await getBackendRequest(TASK_PATH);
        } else {
          return getBackendRequestDummy(TASK_PATH);
        }
      } catch (error) {
        console.log(error);
      }
    }

    async function requestTaskCollections() {
      try {
        if (process.env.VUE_APP_BACKEND_ONLINE === "true") {
          return await getBackendRequest(TASK_COLLECTION_PATH);
        } else {
          return getBackendRequestDummy(TASK_COLLECTION_PATH);
        }
      } catch (error) {
        console.log(error);
      }
    }

    async function loadTasksOfProfessor() {
      try {
        listOfTasks.value = getBackendRequest(TASK_PATH + "/" + state.user._id);
      } catch (error) {
        console.log(error);
      }
    }

    function emitOpenTaskCollection(id = -1) {
      emit("exerciseSelected", { id: id, kindOfExercise: "collection" });
    }

    function emitOpenTask(id = -1) {
      emit("exerciseSelected", { id: id, kindOfExercise: "task" });
    }

    return {
      emitOpenTaskCollection,
      listOfTasks,
      selectedTask,
      emitOpenTask,
      listOfTaskCollections,
      activeTabs,
    };
  },
};
</script>
<style lang="scss" scoped>
button {
  width: 100%;
}
</style>

<style lang="scss">
.TaskCollectionAccordion {
  .p-accordion-content {
    padding: 0;
  }
}
</style>
