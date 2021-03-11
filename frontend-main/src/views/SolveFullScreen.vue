<template>
  <div>
    {{ exerciseId }}
    <h2>Solve Exercise</h2>
    <div v-if="exercise.type === 'TaskCollection'">
      <Splitter layout="horizontal">
        <SplitterPanel size="20">
          <Listbox
            v-model="selectedTaskLite"
            :options="exercise.tasks"
            optionLabel="title"
            optionDisabled="disabled"
            metaKeySelection="false"
          />
        </SplitterPanel>
        <SplitterPanel size="80">
          <div v-if="selectedTaskLite?._id">
            <SolveTask :taskID="selectedTaskLite._id" v-on:taskSubmitted="taskSubmitted"/>
          </div>
          <div v-else>Bitte eine Aufgabe auswählen.</div>
        </SplitterPanel>
      </Splitter>
    </div>
    <div v-else-if="exercise.type === 'task'">
      <p>Task ausgewählt</p>
        <SolveTask :taskID="exercise?._id"/>
    </div>
    <div v-else>
      <p> Invalid ID</p>
      </div>
  </div>
</template>
<script>
import { ref, onMounted, defineAsyncComponent, watch } from "vue";
import {
  getBackendRequest,
  postBackendRequest,
  deleteBackendRequest,
  putBackendRequest,
} from "../helper/requests";
import { useToast } from "primevue/usetoast";
import SolveTask from "../components/ExerciseSolve/SolveTask";

import { getBackendRequestDummy } from "../helper/dummyRequests";

const PATHS = require("../../config.json").URL_PATHS;

const TASK_PATH = PATHS.TASK_PATH;
const TASK_COLLECTION_PATH = PATHS.TASK_COLLECTION_PATH;

export default {
  name: "SolveFullScreen",
  components:{
    SolveTask
  },
  setup() {
    const URL_PARAMS = new URLSearchParams(window.location.search);
    const exerciseType = ref("taskCollection");
    const selectedTaskLite = ref({});
    const exercise = ref({});
    const toast = useToast();

    let exerciseId = URL_PARAMS.get("exerciseId");

    initialize();
    function initialize() {
      getExercise();
    }

    async function getExercise() {
      if (process.env.VUE_APP_BACKEND_ONLINE === "true") {
        try {
          exercise.value = await getBackendRequest(
            TASK_PATH + "/" + exerciseId
          );
        } catch (error) {
          try {
            exercise.value = await getBackendRequest(
              TASK_COLLECTION_PATH + "/" + exerciseId
            );
          } catch (error2) {
            toast.add({
              severity: "error",
              summary: "invalid ID",
              life: 9000,
            });
          }
        }
      } else {
        exercise.value = getBackendRequestDummy(TASK_PATH + "/" + exerciseId);
        // exercise.value = getBackendRequestDummy(TASK_COLLECTION_PATH + "/" + exerciseId);
      }
    }

    function taskSubmitted(payload){
      let submittedIndex = exercise.value.tasks.findIndex((task) => task._id == payload.id)
      exercise.value.tasks[submittedIndex] = {...exercise.value.tasks[submittedIndex], disabled: true}

      selectedTaskLite.value = {}
    }

    return {
      exerciseId,
      selectedTaskLite,
      exerciseType,
      exercise,
      taskSubmitted
    };
  },
};
</script>