<template>
  <div class="hello">
    <!-- <h1>{{ msg }}</h1> -->
    <p>
     Bye
    </p>

  </div>
    
</template>

<script>
import { ref } from "vue"
import VueCookies from 'vue-cookies'
export default {

  name: 'HelloWorld',
  setup() {
    const backendresponse = ref("");
    const question = ref("");
    const desc = ref("");
    const hiddentests = ref("");
    const opentests = ref("");
    const questionId = ref("");
    const singelQuestion = ref("");
    const questId = ref("");
    const tests = ref({});
    const axiosAuthHeader = {
          headers: {
            Authorization: 'Bearer ' + VueCookies.get('token')
          }
        }

    const axios = require("axios");

    //const questions = {question: "Sprich deutsch", tests: {hiddentest: "hidden1", opentest: "open1"}};
  
    async function getResponse(){
      const resp = await axios.get('http://localhost:3000', axiosAuthHeader)
      backendresponse.value = await resp.data
      return backendresponse
    }

    async function getQuestions(){
      const resp = await axios.get('http://localhost:3000/firstquestions', axiosAuthHeader);
      question.value = resp.data;
      //console.log(resp.data);
      return question;
    }

    async function postQuestion(){
      const headers = {
        'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + VueCookies.get('token')
      }
      let firstquestion = {
        question: desc.value, 
        tests: {
          hiddentest: hiddentests.value, 
          opentest: opentests.value
        }
      }
      await axios.post('http://localhost:3000/firstquestions', firstquestion, {headers: headers});
      clearInput()
    }

    async function getSingelQuestion(){
      const resp = await axios.get(selectQuestion(), axiosAuthHeader);
      singelQuestion.value = resp.data;
      clearInput()
      return singelQuestion
    }

    async function patchQuestion(){

      const headers = {
        'Content-Type': 'application/json',
       'Authorization': 'Bearer ' + VueCookies.get('token')
      }
      let firstquestion = {
        question: desc.value, 
        tests: {
          hiddentest: hiddentests.value, 
          opentest: opentests.value
        }
      }
      console.log(firstquestion)
      await axios.patch(selectQuestion(), firstquestion, {headers: headers});
      clearInput()
    }

    async function deleteQuestion(){
      await axios.delete(selectQuestion(), axiosAuthHeader);
      clearInput()
    }

    /**
     * Support-Methods:
     */

    function selectQuestion(){
      const selectedQuestionRoot = "http://localhost:3000/firstquestions/" + questId.value;
      return selectedQuestionRoot;
    }

    function clearInput(){
      console.log("test?")
      desc.value = "";
      hiddentests.value = "";
      opentests.value = "";
      questId.value = "";
    }

    return {
      getQuestions,
      postQuestion,
      getSingelQuestion,
      getResponse,
      patchQuestion,
      deleteQuestion,
      question,
      backendresponse,
      desc,
      hiddentests,
      opentests,
      questId,
      singelQuestion,
      tests
    }
  }
}
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

tr:nth-child(even) {
  background-color: #dddddd;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
</style>
