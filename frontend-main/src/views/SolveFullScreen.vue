<template>
  <div>
    {{ exerciseId }}
    <h2>Solve Exercise</h2>
    <div v-if="exerciseType === 'taskCollection'">
      <Splitter layout="horizontal">
          <SplitterPanel size="20">
          <!-- <Selector @exerciseSelected="exerciseSelected"/> -->
          </SplitterPanel>
          <SplitterPanel size="80">
            <div v-if="exerciseSelected">
              <!-- <SolveTask :taskID="exerciseId" /> -->
            </div>
            <div v-else>Bitte eine Aufgabe auswählen.</div>
          </SplitterPanel>
        </Splitter>
    </div>
    <div v-else>
      <!-- <SolveTask :taskID="exerciseId" /> -->
    </div>
  </div>
</template>
<script>
import { ref, onMounted, defineAsyncComponent, watch } from "vue";
export default {
  name: "SolveFullScreen",
  setup() {
    const URL_PARAMS = new URLSearchParams(window.location.search);
    const exerciseType = ref("taskCollection");
    const exerciseSelected = ref(true);

    let exerciseId = 'URL_PARAMS.get("exerciseId")';

    return {
      exerciseId,
      exerciseSelected,
      exerciseType,
    };
  },
};
</script>