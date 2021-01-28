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
        </div>
        <div v-else-if="exerciseType=='collection'">
          TaskCollection ausfüllen
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
        // Beispiel Aufgabe
        return ({plugin :'codeJS', title:'TIIIITEL', description:'The Vue community generally favors using Vuex to solve this kind of issue. Changes are made to Vuex state and the DOM representation just flows from that, eliminating the need for events in many cases.'})
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