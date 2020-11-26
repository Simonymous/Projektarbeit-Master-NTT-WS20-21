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
      async function getUser() {
        const response = await axios.get('user', {
          headers: {
            Authorization: 'Bearer' + localStorage.getItem('token')
          }
        })
        state.user = response.data.user
        console.log(response.data)
      }
      return {
        state,
      }
    }
  }
</script>