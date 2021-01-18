<template>
  <Accordion :multiple="true" :activeIndex="[0,1]">
    <AccordionTab header="Task" :active="true">
      <Button label="Create new Task" v-on:click="buttonClickCreateTask"></Button>
      <Listbox class="listbox" />
    </AccordionTab>
    <AccordionTab header="Task Collection">
      <Button label="Create new TaskCollection" v-on:click="buttonClickCreateTaskCollection"></Button>
      <PanelMenu :model="TaskCollectionItems" :multiple="true"
    /></AccordionTab>
  </Accordion>
</template>
<script>
import { ref } from "vue";

export default {
  setup(props,{emit}) {
    const TaskCollectionItems = ref([
      {
        label: "Aufgabenblatt 1",
        items: [
          {
            label: "Exercise 1",
          },
          { label: "Exercise 2" },
        ],
      },
      {
        label: "Aufgabenblatt 2",
        items: [
          {
            label: "Exercise 3",
          },
          { label: "Exercise 4" },
        ],
      },
    ]);

    function buttonClickCreateTask(){
      emit('exerciseSelected', {id:-1, kindOfExercise:'task'})
    }

    function buttonClickCreateTaskCollection(){
      emit('exerciseSelected', {id:-1, kindOfExercise:'collection'})
    }

    return { TaskCollectionItems, buttonClickCreateTask, buttonClickCreateTaskCollection };
  },
};
</script>
<style scoped>
button {
  width: 100%;
}
</style>