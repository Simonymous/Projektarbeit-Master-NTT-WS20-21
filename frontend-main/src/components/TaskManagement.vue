<template>
  <div class="TaskManagement">
    <h2>Task Management</h2>
    <Splitter layout="horizontal">
      <SplitterPanel size='20'>
        <div>
          <GetTask/>
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
import GetTask from './GetTask'
import SelectPluginDropdown from './SelectPluginDropdown'
export default {
  components: {
    CreateTask,
    GetTask,
    SelectPluginDropdown,
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