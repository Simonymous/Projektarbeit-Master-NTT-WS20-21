<template>
  <div class='solveTask'>
    <div class='taskInfo'>
      <!-- Title, Beschreibung ... -->
    </div>
    <div class='taskWork'>
      <show-plugin/>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import VueCookies from 'vue-cookies';
import { useState } from '../../store/store';
import ShowPlugin from '../ShowPlugin.vue';
// import SelectPluginDropdown from '../SelectPluginDropdown'
import availablePlugins from '../Plugins/paths.json'

// import { getBackendRequest, postBackendRequest, deleteBackendRequest, putBackendRequest } from "../../helper/requests";

export default {
  name: 'solveTask',
  components: {
    ShowPlugin,
    // SelectPluginDropdown
  },
  props: {
    exercise: {plugin :'codeJS', titel:''}
  },
  setup(props) {
    let state = useState();

selectPlugin()

    async function selectPlugin(){
    console.log(await (import('@/' + (availablePlugins.find(plugin => plugin.code === props.exercise.plugin)).path)))
    state.plugin = (await import('@/' + (availablePlugins.find(plugin => plugin.code === props.exercise.plugin)).path)).solveTask;

    }

  },
};
</script>

<style scoped>
.p-inputtext {
  margin: 5px;
}
button {
  margin: 5px;
}
</style>