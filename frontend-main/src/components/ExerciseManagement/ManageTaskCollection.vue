<template>
  <div>
    Title:<InputText
      type="text"
      v-model="taskCollection.title"
      placeholder="Title"
    />
    Description:<InputText
      type="text"
      v-model="taskCollection.description"
      placeholder="Description"
    />
    Tags:<InputText
      type="text"
      v-model="taskCollection.tags"
      placeholder="Tags"
    />
    Class:<InputText
      type="text"
      v-model="taskCollection.class"
      placeholder="Class"
    />

    <customAutocomplete @addTask="addTask" />

    <DataTable
      :value="taskCollection?.tasks"
      @row-reorder="onRowReorder"
      editMode="cell"
    >
      <Column :rowReorder="true" headerStyle="width: 3rem" />

      <Column field="taskName" header="Aufgabenname"> </Column>
      <Column
        field="weighting"
        :header="'Gewichtung (Gesamt: ' + totalPoints + '/100)'"
        :headerClass="totalPoints == 100 ? 'pointsCorrect' : 'pointsIncorrect'"
      >
        <template #editor="slotProps">
          <InputText
            v-model="slotProps.data[slotProps.column.props.field]"
            @input="calcTotalPoints()"
          />
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

    <div class="createTaskCollectionFooter">
      <Button label="Save" v-on:click="handleSaveClick"></Button>
      <Button label="Delete" v-on:click="handleDeleteClick"></Button>
    </div>
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
const CREATE_TASKCOLLECTION_PATH = PATHS.CREATE_TASKCOLLECTION_PATH;
const UPDATE_TASKCOLLECTION_PATH = PATHS.UPDATE_TASKCOLLECTION_PATH;
const DELETE_TASKCOLLECTION_PATH = PATHS.DELETE_TASKCOLLECTION_PATH;

export default {
  components: {
    customAutocomplete: Autocomplete,
  },
  props: {
    taskCollectionID: String,
  },
  setup(props) {
    const taskCollection = ref();
    const totalPoints = ref();

    let emptyTaskCollection = {
      ID: -1,
      type: "TaskCollection",
      title: "",
      description: "",
      date: new Date(),
      tags: [],
      class: "",
      creator: "",
      tasks: [],
    };

    init();
    async function init() {
      if (props.taskCollectionID === -1) {
        taskCollection.value = { ...emptyTaskCollection };
      } else {
        await getTaskCollections();
      }
      calcTotalPoints();
    }

    watch(
      () => props.taskCollectionID,
      () => init()
    );

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

    async function handleSaveClick() {
      try {
        if (taskCollection.value.ID === -1) {
          postBackendRequest(CREATE_TASKCOLLECTION_PATH, taskCollection.value);
        } else {
          postBackendRequest(UPDATE_TASKCOLLECTION_PATH, taskCollection.value);
        }
      } catch (error) {
        console.log(error);
      }
    }

    async function handleDeleteClick() {
      try {
        // deleteBackendRequest(DELETE_TASKCOLLECTION_PATH + "/" + taskCollection.value.ID);
        taskCollection.value = { ...emptyTaskCollection };
      } catch (error) {
        console.log(error);
      }
    }

    function calcTotalPoints() {
      totalPoints.value = 0;
      taskCollection.value.tasks.forEach((task) => {
        totalPoints.value += +task.weighting;
      });
    }

    function onRowReorder(event) {
      taskCollection.value.tasks = event.value;
    }

    function addTask(payload) {
      taskCollection.value.tasks.push({
        taskName: payload.title,
        ID: payload._id,
        weighting: 0,
      });
      console.log(payload);
    }

    return {
      taskCollection,
      onRowReorder,
      addTask,
      totalPoints,
      calcTotalPoints,
      handleSaveClick,
      handleDeleteClick,
    };
  },
};
</script>
<style lang="css">
.pointsIncorrect {
  color: black !important;
  background: red !important;
}

.pointsCorrect {
  color: green !important;
}
</style>
