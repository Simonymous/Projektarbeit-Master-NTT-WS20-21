<template>
  <div>
    <FileUpload name="demo[]" :customUpload="true" @uploader="myUploader" accept=".json"/>
  </div>
</template>
<script>
    import {ref} from 'vue'

export default {
  //:customUpload="true" @uploader="myUploader"
  name: "importExport",
  setup(props) {

      let myFile = ref();

    function myUploader(event) {

        // let file = event.files[0]

        const reader = new FileReader();
        reader.onload = e => console.log(e.target.result);

        event.files.forEach(file => {
            reader.readAsText(file);
        });

}
    return {
      myUploader,
    };
  },
};
</script>


