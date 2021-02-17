<template>

  <div>
<!-- Title:<InputText type="text" v-model="task.tags" placeholder="Tags" />
Description:<InputText type="text" v-model="task.tags" placeholder="Tags" />
Tags:<InputText type="text" v-model="task.tags" placeholder="Tags" />
Fach:<InputText type="text" v-model="task.tags" placeholder="Tags" /> -->

<!-- <AutoComplete v-model="selectedCountry2" :suggestions="filteredCountries" @complete="searchCountry($event)" :dropdown="true" field="name" forceSelection>
    <template #item="slotProps">
        <div class="country-item">
            <img src="../../assets/images/flag_placeholder.png" :class="'flag flag-' + slotProps.item.code.toLowerCase()" />
            <div>{{slotProps.item.name}}</div>
        </div>
    </template>
</AutoComplete> -->
<AutoComplete v-model="selectedCountry2" :suggestions="arr" @complete="test($event)"/>

<!-- 
  <DataTable
    :value="taskCollection?.tasks"
    @row-reorder="onRowReorder"
    editMode="cell"
  >
    <Column
      :rowReorder="true"
      headerStyle="width: 3rem"
    />

    <Column field="taskName" header="Aufgabenname">
    </Column>
    <Column field="weighting" header="Gewichtung">
      <template #editor="slotProps">
        <InputText v-model="slotProps.data[slotProps.column.props.field]" />
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
  </DataTable> -->
  </div>
</template>
<script>
import { ref, watch, onMounted } from "vue";

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
  props: {
    taskCollectionID: Number,
  },
  setup(props) {
    const taskCollection = ref();
    const selectedCountry2 = ref(null);
    const arr = ref([{taskName: "sdjonf"}, {taskName: "psmfdoi"}, {taskName: "sdkmf"}])
    let strArr = ["oamdmoad", "poamd", "sdsd"]

init()
    async function init() {
        setTaskCollections()
    }

    async function setTaskCollections() {
      try {
        if (process.env.VUE_APP_BACKEND_ONLINE === "true") {
          taskCollection.value =  await getBackendRequest(
            TASK_COLLECTION_PATH + "/" + props.taskCollectionID
          );
        } else {
          taskCollection.value = getBackendRequestDummy(
            TASK_COLLECTION_PATH + "/" + props.taskCollectionID
          );
          console.log(taskCollection.value.tasks)
          console.log(arr.value)
        }
      } catch (error) {
        console.log(error);
      }
    }

    function onRowReorder(event) {
          taskCollection.value.tasks = event.value;
      }

function test(e){
    // return{taskName:"rtzu"}
    console.log(e)
    console.log(arr.value)
    arr.value = [{taskName: "sdjonf"}, {taskName: "psmfdoi"}, {taskName: "sdkmf"}]
    // return (arr)
}


    return {
      taskCollection,
      onRowReorder,
      selectedCountry2,
      test,
      arr,
      strArr
    };
  }
};
</script>
<style lang="css" scoped>
/* button{
    margin:5px !important
} */
</style>