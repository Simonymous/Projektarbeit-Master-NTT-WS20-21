<template>
  <div class="ExerciseManagement">
    <h2>Exercise Management</h2>
    <Splitter layout="horizontal">
      <SplitterPanel size='20'>
        <div>
          <ExerciseManagementSelector/>
          <SelectPluginDropdown/>
        </div>       
      </SplitterPanel>
      <SplitterPanel size='80'>
        <div>
          <CreateTask/>
        </div>
      </SplitterPanel>
    </Splitter>
  </div>
</template>

<script>
import CreateTask from './CreateTask'
import ExerciseManagementSelector from './ExerciseManagementSelector.vue'
// import GetTask from './GetTask'
import SelectPluginDropdown from './SelectPluginDropdown'
export default {
  components: {
    CreateTask,
    //GetTask,
    SelectPluginDropdown,
    ExerciseManagementSelector,
  },
  setup(){
    return {

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