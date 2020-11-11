<template>
  <div class="hello">
    <!-- <h1>{{ msg }}</h1> -->
    <p>
     Frontend läuft 
    </p>
    <p>
      Backend return:
      {{ backendresponse }}
    </p>
  </div>
</template>

<script>
import { ref } from "vue"
export default {

  name: 'HelloWorld',
  setup() {
    const backendresponse = ref("");
    const axios = require("axios");
    
    


    async function getResponse(){
      const resp = await axios.get('http://localhost:3000')
      backendresponse.value = await resp.data
      console.log(backendresponse)
      return backendresponse
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
      getResponse
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
