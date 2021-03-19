<template>
  <div>
    <FileUpload
      name="demo[]"
      :customUpload="true"
      @uploader="myUploader"
      accept=".json"
      :multiple="true"
      :auto="true"
      @remove="test()"
      @upload="test()"
      @clear="test()"
    />
    <Button
      label="Task(s) neu erstellen"
      v-on:click="handleCreateNewTasks"
    ></Button>
    <Button
      label="Task(s) überschreiben"
      v-on:click="handleOverwriteTasks"
    ></Button>
  </div>
</template>
<script>
import { ref } from "vue";
import { useToast } from "primevue/usetoast";

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
        console.log(myFiles.value)
      });
      toast.add({
        severity: "success",
        summary: "TaskCollection/Task wurde importiert",
        life: 10000,
      });
    }

    function test() {
      console.log("oksdnm");
      // console.log(event)
    }

    function handleCreateNewTasks() {
      console.log(myFiles.value);
    }

    function handleOverwriteTasks() {}
    return {
      myUploader,
      handleCreateNewTasks,
      handleOverwriteTasks,
      test,
    };
  },
};
</script>


