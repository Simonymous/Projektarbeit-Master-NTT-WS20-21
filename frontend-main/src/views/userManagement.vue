<template>
  <div class="UserManagement">
    <h1>User Management</h1>
    <div>
      <Button label="getUsers" @click="getUsers()"/>
      <Button label="createUser" @click="createUser()"/>
      <Button label="deleteUser" @click="deleteUser()"/>
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
      <table>
        <tr>
          <th>User-ID</th><th>Username</th><th>Password</th><th>Email</th><th>Roll</th>
        </tr>
        <tr v-for="user in users" :key="user._id">
          <td v-on:click='getUser(user._id)'>{{user._id}}</td>
          <td>{{user.name}}</td>
          <td>{{user.password}}</td>
          <td>{{quest.email}}</td>
          <td>{{quest.roll}}</td>
        </tr>
      </table>
    </div>
    <div>
      <InputText type="text" v-model="userId" placeholder="UserID"/>
      <p>{{user}}</p>
    </div>
  </div>
</template>

<script>
import { ref } from "vue"
import VueCookies from 'vue-cookies'
export default {
  name: 'userManagement',

  setup(props) {

    const axios = require("axios");
    const axiosAuthHeader = {
      'Content-Type': 'application/json',
      'Authorization': VueCookies.get('token')
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
      const resp = await axios.get('http://localhost:3000', axiosAuthHeader)
      users.value = resp.data
      return users
    }

    async function createUser(){
      await axios.post('http://localhost:3000', User(), axiosAuthHeader);
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

    async function deleteUser(){
      await axios.delete(selectUser(userId.value), axiosAuthHeader);
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
      createUser,
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