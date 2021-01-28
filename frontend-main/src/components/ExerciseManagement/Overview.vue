<template>
  <div class="ExerciseManagement">
    <h2>Exercise Management</h2>
    <Splitter layout="horizontal">
      <SplitterPanel size='20'>
        <div>
          <Selector @exerciseSelected="exerciseSelected"/>
        </div>       
      </SplitterPanel>
      <SplitterPanel size='80'>
        <div v-if="exerciseType=='task'">
          <ManageTask/>
        </div>
        <div v-else-if="exerciseType=='collection'">
          TaskColleaction Erstellen
        </div>
        <div v-else>
        Bitte eine Aufgabe oder Aufgabenblatt auswählen.
        </div>


<!--           <CreateTask/>
        </div> -->
      </SplitterPanel>
    </Splitter>
  </div>
</template>

<script>
import ManageTask from './ManageTask'
import Selector from './Selector.vue'
import { ref, onMounted, mounted } from 'vue'
export default {
  components: {
    ManageTask,
    Selector,
  },
  setup(){
    const exerciseType = ref();
    
    function exerciseSelected(payload){
      exerciseType.value = payload.kindOfExercise;
    }
    return {
      exerciseSelected,
      exerciseType
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