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
          <Button
            v-on:click="submitWholeCollection"
            label="Submit Collection"
          ></Button>
        </SplitterPanel>
        <SplitterPanel size="80">
          <div v-if="selectedTaskLite?._id">
            <SolveTask
              :taskID="selectedTaskLite._id"
              :customSubmitPath="SUBMIT_TASK_IN_COLLECTION_PATH + '/' + exerciseId"
              v-on:taskSubmitted="taskSubmitted"
            />
          </div>
          <div v-else>Bitte eine Aufgabe auswählen.</div>
        </SplitterPanel>
      </Splitter>
    </div>
    <div v-else-if="exercise.type === 'task'">
      <p>Task ausgewählt</p>
      <SolveTask :taskID="exercise?._id" v-on:taskSubmitted="terminateInputProcess"/>
    </div>
    <div v-else-if="exercise.type === 'finished'">
      <p>Aufgabe abgegeben</p>
    </div>
    <div v-else>
      <p>Invalid ID</p>
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
  setAccessToken
} from "../helper/requests";
import { useToast } from "primevue/usetoast";
import SolveTask from "../components/ExerciseSolve/SolveTask";

import { getBackendRequestDummy } from "../helper/dummyRequests";

const PATHS = require("../../config.json").URL_PATHS;

const TASK_PATH = PATHS.TASK_PATH;
const TASK_COLLECTION_PATH = PATHS.TASK_COLLECTION_PATH;
const SUBMIT_TASK_IN_COLLECTION_PATH = PATHS.SUBMIT_TASK_IN_COLLECTION_PATH;
const SUBMIT_TASK_COLLECTION_PATH = PATHS.SUBMIT_TASK_COLLECTION_PATH;


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
    //console.log(URL_PARAMS.get("token"))

    initialize();
    function initialize() {
      getExercise();
      setAccessToken(URL_PARAMS.get("token"));
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

    async function submitWholeCollection(){
      await postBackendRequest(SUBMIT_TASK_COLLECTION_PATH + "/" + exerciseId);
      terminateInputProcess()
    }

    function terminateInputProcess(){
      exercise.value.type = 'finished'
    }

    return {
      exerciseId,
      selectedTaskLite,
      exerciseType,
      exercise,
      taskSubmitted,
      SUBMIT_TASK_IN_COLLECTION_PATH,
      submitWholeCollection,
      terminateInputProcess
    };
  },
};
</script>
<style lang="scss" scoped>
button {
  margin: 5px;
}
</style>