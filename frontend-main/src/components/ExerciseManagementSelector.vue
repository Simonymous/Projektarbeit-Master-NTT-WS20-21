<template>
  <Accordion :multiple="true" :activeIndex="activeIndex">
    <AccordionTab header="Task" :active="true">
      <Listbox class="listbox" />
    </AccordionTab>
    <AccordionTab header="Task Collection">
      <PanelMenu :model="TaskCollectionItems" :multiple="true"
    /></AccordionTab>
  </Accordion>
</template>
<script>
import { ref } from "vue";

export default {
  setup() {
    const activeIndex = ref([0, 1]);
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

    return { activeIndex, TaskCollectionItems };
  },
};
</script>