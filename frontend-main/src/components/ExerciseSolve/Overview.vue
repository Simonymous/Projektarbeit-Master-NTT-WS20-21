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
          <SolveTask :exercise="exercise" />
          "SolveTask"
        </div>
        <div v-else-if="exerciseType=='collection'">
        qwertzuiop
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
import Selector from './Selector.vue'
import { ref, onMounted, mounted } from 'vue'
export default {
  components: {
    SolveTask,
    Selector,
  },
  setup(){
    const exerciseType = ref();
    const exerciseId = ref();
    const exercise = ref();
    
    function exerciseSelected(payload){
      exerciseType.value = payload.kindOfExercise;
      exerciseId.value = payload.id;
      exercise.value = getExerciseFromId(payload.id);
      console.log(getExerciseFromId(payload.id))
    }

    function getExerciseFromId(Id){
      if(process.env.NODE_ENV === "development"){
        return ({plugin :'codeJS', titel:'TIIIITEL'})
      }else{
        //request
        return {}
      }
    }

    return {
      exerciseSelected,
      exerciseType,
      exercise
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