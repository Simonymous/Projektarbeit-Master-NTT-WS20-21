<template>
  <div v-if="!isUploading">
    <FileUpload
      name="demo[]"
      :customUpload="true"
      @uploader="myUploader"
      accept=".json"
      :auto="true"
      :showUploadButton="false"
    />

    <Button
      label="Task(s) neu erstellen"
      v-on:click="handleCreateNewTasks"
    ></Button>
  </div>
  <div v-else>
    <ProgressSpinner />
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
    let isUploading = ref(false);

    function myUploader(event) {
      myFiles.value = [];

      event.files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => myFiles.value.push(JSON.parse(e.target.result));
        reader.readAsText(file);

      });
    }

    async function importFile(filecontent) {
      try {
        let taskCollections = [];

        filecontent.forEach((exercise) => {
          console.log(exercise);
          if (exercise.type === "TaskCollection") {
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
          } else if (exercise.type !== "task") {
            throw "Unknown Element " + exercise.type;
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
              newID: response.task._id,
            });
          }
        }

        if (!taskCollections.length) {
          toast.add({
            severity: "success",
            summary: filecontent.length + " Tasks wurde erstellt",
            life: 10000,
          });
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
                  response.task.title +
                  " wurde gespeichert",
                life: 10000,
              });
            }
          );
        });
        isUploading.value = false;
      } catch (error) {
        isUploading.value = false;
        toast.add({
          severity: "error",
          summary: "Error creating Exercises:",
          detail: error,
          life: 10000,
        });
      }
    }

    function handleCreateNewTasks() {
      isUploading.value = true;
      myFiles.value.forEach((file) => {
        importFile(file);
      });
    }

    return {
      myUploader,
      handleCreateNewTasks,
      isUploading,
    };
  },
};
</script>
<style lang="scss" scoped>
::v-deep(.p-button-icon-only) {
  visibility: hidden;
}
</style>
