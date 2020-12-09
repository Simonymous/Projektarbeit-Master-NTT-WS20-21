<template>

<Panel header="Passwort ändern" >

<div class="p-grid p-fluid">
    <div class="p-col-12 p-md-4">
        <div class="p-inputgroup">
          <span class="p-float-label">
            <InputText type="password" v-model="oldpassword"  id="oldpassword" />
            <label for="username">Altes Password</label>
          </span>
        </div>
    </div>

    <div class="p-col-12 p-md-4">
        <div class="p-inputgroup">
          <span class="p-float-label">
            <Password v-model="password"  id="password" autocomplete="on" ></Password>
            <label for="username">Neues Password</label>
          </span>
        </div>
    </div>

    <div class="p-col-12 p-md-4">
        <div class="p-inputgroup">
          <span class="p-float-label">
            <InputText type="password" v-model="newpassword"  id="newpassword" />
            <label for="username">Neues Password wiederholen</label>
          </span>
        </div>
    </div>

    
</div>
    <Button label="Speichern" icon="pi pi-check" iconPos="left">Speichern</Button>

</Panel>
</template>
<script>
import { ref } from "vue"
import { useRouter } from 'vue-router'
import VueCookies from 'vue-cookies'
export default {
  name: 'Settings',

  setup() {




    return {
    }
  }

}


</script>