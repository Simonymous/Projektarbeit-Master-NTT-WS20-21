<template>
  <AutoComplete
    v-model="selected"
    :suggestions="suggestions"
    field="title"
    @complete="search($event)"
    @item-select="onItemSelect($event)"
    :dropdown="true"
    placeholder='Tasks'
  />
</template>
<script>
import { ref, watch } from "vue";
import { getBackendRequestDummy } from "../../helper/dummyRequests";
import { getBackendRequest } from "../../helper/requests";
import { useToast } from "primevue/usetoast";

const PATHS = require("../../../config.json").URL_PATHS;

const TASK_PATH = PATHS.TASK_PATH;

export default {
  setup(props, { emit }) {
    const suggestions = ref([]);
    const allItems = ref([]);
    const selected = ref();

    const toast = useToast();

    init();
    async function init() {
      allItems.value = await requestTasks();
      suggestions.value = [...allItems.value];
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

    function search(event) {
      let lowercaseQuery = event.query.toLowerCase();
      suggestions.value = allItems.value.filter((task) =>
        task.title.toLowerCase().includes(lowercaseQuery)
      );
    }

    function onItemSelect(event) {
      emit("addTask", event.value);
      selected.value = null;
      toast.add({
        severity: "success",
        summary: "Task added to TaskCollection",
        life: 3000,
      });
    }

    return {
      suggestions,
      selected,
      search,
      onItemSelect,
    };
  },
};
</script>