<template>
  <div class="hello">
    <!-- <h1>{{ msg }}</h1> -->
    <p>
     Frontend STATUS OK :-)
    </p>
    <p>
      Backend response:
      {{ backendresponse }}
    </p>
  </div>
  <div>
    <input v-model="desc" placeholder="beschreibung">
    <input v-model="hiddentests" placeholder="hiddentest">
    <input v-model="opentests" placeholder="opentest">
    <button v-on:click="getQuestions">getQuestions</button>
    <button v-on:click="postQuestion">postQuestion</button>
    {{ question }}
  </div>
</template>

<script>
import { ref } from "vue"
export default {

  name: 'HelloWorld',
  setup() {
    const backendresponse = ref("");
    const question = ref("");
    const desc = ref("");
    const hiddentests = ref("");
    const opentests = ref("")
    const tests = ref({})

    const axios = require("axios");

    const questions = {question: "Sprich deutsch", tests: {hiddentest: "hidden1", opentest: "open1"}};
  
    
/*     async function insertQuestion() {
      console.log("test")
      let quest = {question: desc, tests: {hiddentest: hiddentests, opentest: opentests}}
      console.log(quest)
      return quest
    } */

    async function getResponse(){
      const resp = await axios.get('http://localhost:3000')
      backendresponse.value = await resp.data
      console.log(backendresponse)
      return backendresponse
    }

    async function getQuestions(){
      const resp = await axios.get('http://localhost:3000/firstquestions');
      console.log(resp.data)
      question.value = resp.data;
      return question;
    }

    async function postQuestion(){
      const headers = {
        'Content-Type': 'application/json',
       'Authorization': '....'
      }
      let quest = {question: desc, tests: {hiddentest: hiddentests, opentest: opentests}}
      console.log(desc)

      let firstquestion = {
        question: desc.value, 
        tests: {
          hiddentest: hiddentests.value, 
          opentest: opentests.value
        }
      }
      //console.log(postData)
      await axios.post('http://localhost:3000/firstquestions', firstquestion, {headers: headers});
    }

    getResponse()

    /**function getResponse() {

       .then(function (response){
       let s = resonde.data;
        backendresponse = response.data;
        console.log(response.data)
        return backendresponse;
      })
      return backendresponse;
    }* */
    return {
      backendresponse,
      getResponse,
      question,
      getQuestions,
      postQuestion,
      desc,
      hiddentests,
      opentests,
      tests
    }
  }

}
/* function getResponse() {
    const axios = require('axios');
    let s = "empty";
    axios.get('http://localhost:3000')
      .then(function (response){
        s = response;
      })
    return s;  
} */
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
