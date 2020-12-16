
<template>
  <div>
    <InputText v-model="varA" placeholder="A" />
    <InputText v-model="operator" placeholder="Operator" />
    <InputText v-model="varB" placeholder="B" />
    <p>=</p>
    <InputText v-model="result" placeholder="Ergebnis" />
  </div>
</template>
<script>
import { Ref, ref } from "vue"


  export default ({
    
    setup(){


      const varA = ref();
      const varB = ref();
      const result = ref();
      const operator = ref();
      

      return varA
    }
  })
</script>
<style scoped>

</style>