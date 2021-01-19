<template>
  <Accordion :multiple="true" :activeIndex="[0,1]">
    <AccordionTab header="Task" :active="true">
      <Button label="Create new Task" v-on:click="buttonClickCreateTask"></Button>
      <Listbox class="listbox" :options="listOfTasks" optionLabel="name" optionValue='code' v-on:change="handleSelectedTask($event)" listStyle="max-height:250px"/>
    </AccordionTab>
    <AccordionTab header="Task Collection">
      <Button label="Create new TaskCollection" v-on:click="buttonClickCreateTaskCollection"></Button>
      <PanelMenu :model="TaskCollectionItems" :multiple="true"
    /></AccordionTab>
  </Accordion>
</template>
<script>
import { ref, onMounted, watch } from "vue";
import { useState } from '../store/store'
import { getBackendRequest, postBackendRequest, deleteBackendRequest, putBackendRequest } from "../helper/requests";

export default {
  setup(props,{emit}) {
    const TASK_PATH = 'task'
    let state = useState()
    const selectedTask = ref(0)
    const selectedTaskCollection = ref(0)
    const listOfTasks = ref([{name: 'Mathe 1', code: 3}, {name: 'Deutsch 1', code: 2}])
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

    async function loadTasksOfProfessor(){
      try{
      listOfTasks.value = getBackendRequest(TASK_PATH + '/' + state.user._id)
      }catch(error){
        console.log(error)
      }
    }

    function buttonClickCreateTask(){
      emit('exerciseSelected', {id:-1, kindOfExercise:'task'})
    }

    function buttonClickCreateTaskCollection(){
      emit('exerciseSelected', {id:-1, kindOfExercise:'collection'})
    }

    watch(selectedTask,(selectedTask,prevSelectedTask) => {
      emit('exerciseSelected', {id: selectedTask, kindOfExercise:'task'})
    })
    
    watch(selectedTaskCollection,(newTaskCollection,oldTaslCollection) => {
      emit('exerciseSelected', {id: selectedTaskCollection, kindOfExercise:'collection'})
    })
    
    //onMounted(loadTasksOfProfessor)

    function handleSelectedTask(e){
      selectedTask.value = e.value
      state.taskId = e.value
      state.selectedTaskObject = e
    }

    return { TaskCollectionItems, buttonClickCreateTask, buttonClickCreateTaskCollection, listOfTasks, selectedTask, handleSelectedTask };
  },
};
</script>
<style scoped>
button {
  width: 100%;
}
</style>