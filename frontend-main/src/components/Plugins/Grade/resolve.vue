<template>
<div>
    <h3>Grade:   <input v-model="grade"/></h3>
    <Slider v-model="grade"/>

    <Button @click="sendGrade"> Submit </Button> 
</div>
</template>
<script>
import { Ref, ref } from "vue"
import VueCookies from 'vue-cookies'
import { useState } from '../../../store/store'


export default ({
    
    setup(){
    const axios = require("axios");
    const axiosAuthHeader = {
        'Content-Type': 'application/json',
        'Authorization': VueCookies.get('access-token')
    }
    const grade = ref(55);

    async function sendGrade(){
        console.log("of" + grade.value)
        await axios.post('http://localhost:3000/moodle/' + grade.value, {headers: axiosAuthHeader});
    }

    return {
        grade,
        sendGrade
    }
    }
})
</script>
<style scoped>
  input{
    width:75px;
  }
  .p-slider{
    margin: 20px;
  }
</style>