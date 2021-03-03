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

export default {
  name: "importExport",
  setup(props) {
    let myFiles = ref([]);

    function myUploader(event) {
      myFiles.value = []

      event.files.forEach((file) => {
        const reader = new FileReader();
      reader.onload = (e) => myFiles.value.push(JSON.parse(e.target.result));
        reader.readAsText(file);
      });
    }

    function test(){
      console.log("oksdnm")
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
      test
    };
  },
};
</script>


