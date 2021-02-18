<template>
  <div>
    <!-- Title:<InputText type="text" v-model="task.tags" placeholder="Tags" />
Description:<InputText type="text" v-model="task.tags" placeholder="Tags" />
Tags:<InputText type="text" v-model="task.tags" placeholder="Tags" />
Fach:<InputText type="text" v-model="task.tags" placeholder="Tags" /> -->

    <customAutocomplete @addTask="addTask" />

    <DataTable
      :value="taskCollection?.tasks"
      @row-reorder="onRowReorder"
      editMode="cell"
    >
      <Column :rowReorder="true" headerStyle="width: 3rem" />

      <Column field="taskName" header="Aufgabenname"> </Column>
      <Column field="weighting" :header="'Gewichtung (Gesamt: ' + totalPoints + '/100)'" :headerClass='totalPoints==100?"pointsCorrect":"pointsIncorrect"' >
        <template #editor="slotProps">
          <InputText v-model="slotProps.data[slotProps.column.props.field]" @input="calcTotalPoints()"/>
        </template>
      </Column>
      <Column :exportable="false">
        <template #body="slotProps">
          <Button
            icon="pi pi-search"
            class="p-button-rounded p-button-text"
            @click="removeOpenTest(slotProps)"
          />
          <Button
            icon="pi pi-trash"
            class="p-button-rounded p-button-danger p-button-text"
            @click="removeOpenTest(slotProps)"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script>
import { ref, watch, onMounted } from "vue";
import Autocomplete from "./Autocomplete";

import { getBackendRequestDummy } from "../../helper/dummyRequests";
import {
  getBackendRequest,
  postBackendRequest,
  deleteBackendRequest,
  putBackendRequest,
} from "../../helper/requests";
const PATHS = require("../../../config.json").URL_PATHS;

const TASK_COLLECTION_PATH = PATHS.TASK_COLLECTION_PATH;

export default {
  components: {
    customAutocomplete: Autocomplete,
  },
  props: {
    taskCollectionID: Number,
  },
  setup(props) {
    const taskCollection = ref();
    const totalPoints = ref()

    init();
    async function init() {
      await getTaskCollections();
      calcTotalPoints()
    }

    async function getTaskCollections() {
      try {
        if (process.env.VUE_APP_BACKEND_ONLINE === "true") {
          taskCollection.value = await getBackendRequest(
            TASK_COLLECTION_PATH + "/" + props.taskCollectionID
          );
        } else {
          taskCollection.value = getBackendRequestDummy(
            TASK_COLLECTION_PATH + "/" + props.taskCollectionID
          );
        }
      } catch (error) {
        console.log(error);
      }
    }

    function calcTotalPoints(){
      totalPoints.value = 0
      taskCollection.value.tasks.forEach(task => {
        totalPoints.value += +task.weighting
      });
    }

    function onRowReorder(event) {
      taskCollection.value.tasks = event.value;
    }

    function addTask(payload) {
      taskCollection.value.tasks.push({taskName: payload.title, ID:payload._id, weighting: 0})
      console.log(payload);
    }

    return {
      taskCollection,
      onRowReorder,
      addTask,
      totalPoints,
      calcTotalPoints
    };
  },
};
</script>
<style lang="css">
.pointsIncorrect{
  color: black !important;
  background:red !important
}

.pointsCorrect{
  color:green !important
}
</style>