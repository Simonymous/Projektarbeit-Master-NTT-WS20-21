<template>
  <div class="solveTask">
    <div class="taskInfo">
      <h1>{{ $props.exercise.title }}</h1>
      <p>{{ $props.exercise.description }}</p>
    </div>
    <div class="taskWork">
      <show-plugin :taskData="dataForPlugin" v-on:updateReturnValue="output" />
    </div>
    <div class="taskFooter">
      <Button label="Test Solution" @click="testSolution" />
      <Button label="Submit Solution" @click="submitSolution" />
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import VueCookies from "vue-cookies";
import { useState } from "../../store/store";
import ShowPlugin from "../ShowPlugin.vue";
import availablePlugins from "../Plugins/paths.json";
import { postBackendRequest } from "../../helper/requests";

export default {
  name: "solveTask",
  components: {
    ShowPlugin,
  },
  props: {
    exercise: { plugin: "codeJS", title: "Eijoo", description: String },
  },

  setup(props) {
    let state = useState();

    let dataForPlugin = ref({ defaultCode: "sqwertzuiopdf" });
    let userInput = ref();

    selectPlugin();

    async function selectPlugin() {
      let pathToPluginConfig =
        "components/Plugins" +
        availablePlugins.find((plugin) => plugin.code === props.exercise.plugin)
          .path;
      let pathToPluginSolve = require("@/" + pathToPluginConfig).solveTask;
      state.plugin = "components/Plugins" + pathToPluginSolve;
    }

    function output(value) {
      userInput = value;
    }

    async function testSolution() {
      try {
        
        const response = await postBackendRequest();
      } catch (error) {
        console.log(error);
      }
    }

    async function submitSolution() {
      try {
        const response = await postBackendRequest();
      } catch (error) {
        console.log(error);
      }
    }

    return {
      dataForPlugin,
      output,
      testSolution,
      submitSolution,
    };
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