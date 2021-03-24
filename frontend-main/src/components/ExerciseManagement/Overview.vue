<template>
  <div class="ExerciseManagement">
    <h2>Exercise Management</h2>
    <Splitter layout="horizontal">
      <SplitterPanel :size="20">
        <div>
          <Selector @exerciseSelected="exerciseSelected"/>
        </div>
      </SplitterPanel>
      <SplitterPanel :size="80">
        <div v-if="exerciseType=='task'">
          <ManageTask v-bind:taskID = "exerciseID" />
        </div>
        <div v-else-if="exerciseType=='collection'">
          <ManageTaskCollection v-bind:taskCollectionID = "exerciseID" @exerciseSelected="exerciseSelected"/>
        </div>
        <div v-else>
          <importExport/>
        </div>
      </SplitterPanel>
    </Splitter>
  </div>
</template>

<script>
import ManageTask from './ManageTask'
import Selector from './Selector.vue'
import ImportExport from './Import.vue'
import { ref, onMounted, mounted } from 'vue'
import ManageTaskCollection from './ManageTaskCollection'
export default {
  components: {
    ManageTask,
    Selector,
    ManageTaskCollection,
    ImportExport
  },
  setup(){
    const exerciseType = ref();
    const exerciseID = ref(-1)

    function exerciseSelected(payload){
      console.log(payload)
      exerciseType.value = payload.kindOfExercise;
      exerciseID.value = payload.id;
    }
    return {
      exerciseSelected,
      exerciseType,
      exerciseID
    }
  }
}
</script>
<style scoped>
  .p-splitter{
    position:absolute;
    height: 100%;
    width: 100%
  }
</style>