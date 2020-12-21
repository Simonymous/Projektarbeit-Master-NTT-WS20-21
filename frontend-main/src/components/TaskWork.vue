<template>
  <div class="taskWork">
    <h2>Test</h2>
    <Splitter layout="horizontal">
      <SplitterPanel size='20'>
        <div>
          <GetTask/>
          <SelectPluginDropdown/>
        </div>       
      </SplitterPanel>
      <SplitterPanel size='80'>
        <div>
          <DisplayTask/>
        </div>
      </SplitterPanel>
    </Splitter>
  </div>
</template>

<script>

import { ref, onBeforeUpdate, watch } from "vue"
import VueCookies from 'vue-cookies'
import { useState } from '../store/store'
import GetTask from './GetTask'
import SelectPluginDropdown from './SelectPluginDropdown'
import DisplayTask from './DisplayTask'

export default {
  name: 'taskWork',
    components: {
    GetTask,
    SelectPluginDropdown,
    DisplayTask,
  },
}

</script>
<style scoped>
  .p-splitter{
    position:absolute; 
    height: 100%;
    width: 100%
  }
</style>