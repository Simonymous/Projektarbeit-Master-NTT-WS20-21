<template>
  <div class="ExerciseManagement">
    <h2>Solve Exercise</h2>
    <Splitter layout="horizontal">
      <SplitterPanel size='20'>
        <div>
          <Selector @exerciseSelected="exerciseSelected"/>
        </div>       
      </SplitterPanel>
      <SplitterPanel size='80'>
        <div v-if="exerciseType=='task'">
          <SolveTask :taskID="exerciseId" />
        </div>
        <div v-else-if="exerciseType=='collection'">
          <SolveTaskCollection :taskCollectionID="exerciseId" />
        </div>
        <div v-else>
        Bitte eine Aufgabe oder Aufgabenblatt auswählen.
        </div>
      </SplitterPanel>
    </Splitter>
  </div>
</template>

<script>
import SolveTask from './SolveTask'
import SolveTaskCollection from './SolveTaskCollection'
import Selector from '../ExerciseSolve/Selector'
import { ref, onMounted, mounted } from 'vue'
export default {
  components: {
    SolveTask,
    Selector,
    SolveTaskCollection
  },
  setup(){
    const exerciseType = ref();
    const exerciseId = ref();
    
    function exerciseSelected(payload){
      exerciseType.value = payload.kindOfExercise;
      exerciseId.value = payload._id;
    }

    return {
      exerciseSelected,
      exerciseType,
      exerciseId
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