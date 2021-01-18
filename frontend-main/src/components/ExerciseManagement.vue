<template>
  <div class="ExerciseManagement">
    <h2>Exercise Management</h2>
    <Splitter layout="horizontal">
      <SplitterPanel size='20'>
        <div>
          <ExerciseManagementSelector @exerciseSelected="exerciseSelected"/>
          <SelectPluginDropdown/>
        </div>       
      </SplitterPanel>
      <SplitterPanel size='80'>
        <div v-if="test=='task'">
          <ManageTask/>
        aosndfoisaf
        </div>
        <div v-else-if="test=='collection'">
        qwertzuiop
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
import ExerciseManagementSelector from './ExerciseManagementSelector.vue'
// import GetTask from './GetTask'
import SelectPluginDropdown from './SelectPluginDropdown'
import { ref } from 'vue'
export default {
  components: {
    ManageTask,
    //GetTask,
    SelectPluginDropdown,
    ExerciseManagementSelector,
  },
  setup(){

    const test = ref({});
    

    function exerciseSelected(payload){
      console.log(payload)
      test.value = payload.kindOfExercise;
      console.log(payload.kindOfExercise);
      console.log(test.value)
      return test
    }
    return {
      exerciseSelected,
      test
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