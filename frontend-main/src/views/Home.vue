<template>
  <div v-if="state.counter > 5">
<!--   <div v-if="state.user"> -->
    <Suspense>
      <HelloWorld/>
    </Suspense>
  </div>
  <div v-else>
    <img alt="Vue logo" src="../assets/philipp.jpg">
    <h2>Ich schick dein Girl in den Puff und lass Sie jeden Mann darin ansprechen,<br />
      auch die Chinesen, die Sie in Mandarin ansprechen!
    </h2>
  </div>

</template>
<script>
  import HelloWorld from '../components/HelloWorld'
  import { useState } from '../store/store';
  import VueCookies from 'vue-cookies'
  import { ref, OnMounted, onMounted } from 'vue'
  export default {
    name: 'home',
    components: {
      HelloWorld,
    },
    /**
     * Über den Authorization Header kann auf den Token zugegriffen werden. Also überprüft werden ob der Benutzer eingeloggt ist.
     * Momentan befindet sich der Token noch im LocalStorage. Kann aber bestimmt auch in unseren Store übernommen werden.
     * Nach dem der User gefunden wurde kann unser state.user objekt gesetzt werden. 
     * Darüber können wir im weiteren verschiedene Optionen festlegen z.b was angezeigt wird, was der User darf etc.
     */
    setup(){
      let state = useState()
      const axios = require("axios");

      const setUserState = async() => {
        axios.get('http://localhost:3000/user', {
          headers: {
            Authorization: 'Bearer ' + VueCookies.get('token')
          }
        }).then(function (response) {
          console.log(response);
          state.user = "response.data.user"
        }).catch(function (error) {
          console.log(error);
          return state
        })
      }

      onMounted(setUserState)

      return {
        state,
        setUserState
      }
    }
  }
</script>