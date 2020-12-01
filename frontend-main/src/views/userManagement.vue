<template>
  <div class="UserManagement">
    <h1>User Management</h1>
    <div>
      <Button label="getUsers" @click="getUsers()"/>
      <Button label="updateUser" @click="updateUser()"/>
      <Button label="getUser" @click="getUser()"/>
    </div>
    <div>
      <InputText type="text" v-model="name" placeholder="Username"/>
      <InputText type="text" v-model="password" placeholder="Password"/>
      <InputText type="text" v-model="email" placeholder="Email"/>
      <SelectButton v-model="selectedRolls" :options="rolls" optionLabel="rollName" :multiple="true" />
    </div>
    <div>
    <DataTable :value="users" :resizableColumns="true" editMode="cell" columnResizeMode="expand" class="editable-cells-table">
      <Column field="_id" header="User-ID"></Column>
      <Column field="username" header="Name"></Column>
        <template #editor="slotProps">
            <InputText v-model="slotProps.data[slotProps.column.props.field]" />
        </template>
      <Column field="password" header="Passwort"></Column>
      <Column field="email" header="E-Mail"></Column>
      <Column field="roles" header="Rollen">
      <template editor="slotProps">
        <Dropdown></Dropdown>
      </template>  
      </Column>
      <Column :exportable="false">
        <template #body="slotProps">
            <Button icon="pi pi-pencil" class="p-button-rounded p-button-success p-mr-2" @click="editUser(slotProps.data)" />
            <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="deleteUser(slotProps.data)" />
        </template>
    </Column>
    </DataTable> 
    </div>
    <div>
      <InputText type="text" v-model="userId" placeholder="UserID"/>
      <p>{{user}}</p>
    </div>
  </div>
</template>

<script>
import { ref } from "vue"
import DataTable from 'primevue/datatable'
import VueCookies from 'vue-cookies'
export default {
  name: 'userManagement',

  data() {
    return {
      roles:[{label: 'Admin', value: 'admin'},{label: 'User', value: 'user'},{label: 'Dozent', value: 'dozent'}]
    }
  },

  setup(props) {

    const axios = require("axios");
    const axiosAuthHeader = {
          headers: {
            Authorization: VueCookies.get('access-token')
          }
    }

    const users = ref('')
    const name = ref('')
    const password = ref('')
    const email = ref('')
    const admin = ref(false)
    const lecturer = ref(false)
    const student = ref(false)
    const user = ref('')
    const userId = ref('')

    const selectedRolls = ref(null)
    const rolls = ref([
      {rollName: 'Admin', code: true},
      {rollName: 'Lecturer', code: true},
      {rollName: 'User', code: true},
    ])

    async function getUsers(){
      console.log(axiosAuthHeader)
      const resp = await axios.get('http://localhost:3000/user/getUsers', axiosAuthHeader)
      console.log(resp.data)
      users.value = resp.data
      return users
    }

    async function getUser(ID){
      const resp = await axios.get(selectUser(ID), axiosAuthHeader)
      user.value = resp.data
      userId.value = ID
      return user, userId
    }

    async function updateUser(){
      await axios.patch(selectUser(userId.value), User(), axiosAuthHeader);
    }

    async function deleteUser(event){
      console.log(event)
      //await axios.delete(selectUser(userId.value), axiosAuthHeader);
    }

    function User(){
      let newUser = {
        name: name.value,
        password: password.value,
        email: email.value,
        roll: {
          admin: false,
          lecturer: false,
          student: false
        }
      }
      selectedRolls.value.forEach(roll => {
        if(roll.rollName === 'Admin'){
          newUser.roll.admin = true
          }
        
        if(roll.rollName === 'Lecturer'){
          newUser.roll.lecturer = true
          }
        if(roll.rollName === 'User'){
          newUser.roll.student = true
          }
        }
      )
      console.log(newUser)
      return newUser
    }

    function selectUser(ID){
      const selectedUserRoot = "http://localhost:3000" + ID;
      return selectedUserRoot;
    }

    return {
      users,
      getUsers,
      getUser,
      name,
      password,
      email,
      admin,
      lecturer,
      user,
      rolls,
      selectedRolls,
      deleteUser,
    }
  }
  
}
</script>