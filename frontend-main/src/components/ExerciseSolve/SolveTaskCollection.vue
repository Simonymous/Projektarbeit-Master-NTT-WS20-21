<template>
  <div class="solveTask">
    <Fieldset :legend="taskCollection.title" :toggleable="true">
      <p>TaskID: {{ taskCollection._id }}</p>
      <p>Titel: {{ taskCollection.title }}</p>
      <p>Description: {{ taskCollection.description }}</p>
    </Fieldset>
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
import { useToast } from "primevue/usetoast";

const PATHS = require("../../../config.json").URL_PATHS;

const TASK_COLLECTION_PATH = PATHS.TASK_COLLECTION_PATH;

export default {
  name: "solveTask",
  props: {
    taskCollectionID: String,
  },

  setup(props, { emit }) {
    let state = useState();
    let userInput = ref();
    const toast = useToast();

    let emptyTask = {
      _id: -1,
      type: "taskCollection",
      title: "",
      description: "",
    };

    const taskCollection = ref({ ...emptyTask });

    watch(
      () => props,
      () => init()
    );

    init();
    async function init() {
      taskCollection.value = await requestTaskCollection();
    }

    async function requestTaskCollection() {
      try {
        if (process.env.VUE_APP_BACKEND_ONLINE == "true") {
          return await getBackendRequest(TASK_COLLECTION_PATH + "/" + props.taskCollectionID);
        } else {
          return getBackendRequestDummy(TASK_COLLECTION_PATH + "/" + props.taskCollectionID);
        }
      } catch (error) {
        console.log(error);
      }
    }


    return {
      taskCollection,
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

Fieldset{
  margin:5px
}
</style>