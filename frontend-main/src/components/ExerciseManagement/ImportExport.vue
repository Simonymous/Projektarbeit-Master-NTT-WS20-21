<template>
  <div>
    <FileUpload
      name="demo[]"
      :customUpload="true"
      @uploader="myUploader"
      accept=".json"
      :auto="true"
    />
    <Button
      label="Task(s) neu erstellen"
      v-on:click="handleCreateNewTasks"
    ></Button>
  </div>
</template>
<script>
import { ref } from "vue";
import { useToast } from "primevue/usetoast";

const PATHS = require("../../../config.json").URL_PATHS;

const CREATE_TASK_PATH = PATHS.CREATE_TASK_PATH;
const CREATE_TASK_COLLECTION_PATH = PATHS.CREATE_TASK_COLLECTION_PATH;

import { postBackendRequest } from "../../helper/requests";

export default {
  name: "importExport",
  setup(props) {
    let myFiles = ref([]);
    const toast = useToast();

    function myUploader(event) {
      myFiles.value = [];

      event.files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => myFiles.value.push(JSON.parse(e.target.result));
        reader.readAsText(file);
        console.log(myFiles.value);
      });
    }

    async function importFile(filecontent) {
      try {
        let taskCollections = [];

        filecontent.forEach((exercise) => {
          console.log(exercise);
          if (exercise.type === "taskCollection") {
            taskCollections.push(exercise);
            exercise.tasks.forEach((task) => {
              if (
                !filecontent.some(
                  (innerExercise) => innerExercise._id == task._id
                )
              ) {
                throw "Missing Tasks " + task._id;
              }
            });
            exercise.tasks.includes;
          } else if (exercise.type !== "taskCollection") {
            throw "Unknown Element";
          }
        });

        let mapping = [];
        for (let i = 0; i < filecontent.length; i++) {
          if (filecontent[i].type === "task") {
            let response = await postBackendRequest(CREATE_TASK_PATH, {
              ...filecontent[i],
            });
            mapping.push({
              oldID: filecontent[i]._id,
              newID: response.data._id,
            });
          }
        }

        taskCollections.forEach((taskCollection) => {
          taskCollection.tasks.forEach((task, taskIndex) => {
            let newIndex = mapping.find(
              (mappingElement) => mappingElement.oldID === task._id
            ).newID;
            taskCollection.tasks[taskIndex] = { ...task, _id: newIndex };
          });
          postBackendRequest(CREATE_TASK_COLLECTION_PATH, taskCollection).then(
            (response) => {
              toast.add({
                severity: "success",
                summary:
                  "TaskCollection " +
                  response.payload.title +
                  " wurde gespeichert",
                life: 10000,
              });
            }
          );
        });
      } catch (error) {
        toast.add({
          severity: "error",
          summary: "Error creating Exercises:",
          detail: error,
          life: 10000,
        });
      }
    }

    function handleCreateNewTasks() {
      console.log(myFiles.value);
      myFiles.value.forEach((file) => {
        importFile(file);
      });
    }

    return {
      myUploader,
      handleCreateNewTasks,
    };
  },
};
</script>
<style lang="scss" scoped>
::v-deep(.p-button-icon-only) {
  visibility: hidden;
}
</style>


