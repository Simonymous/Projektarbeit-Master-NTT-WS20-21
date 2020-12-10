<template>
  <div class="UserManagement">
    <h1>User Management</h1>
    <div>
      <Button icon="pi pi-user-plus" label="Add User" @click="createUser()"></Button>
    </div>
    <div>
    <DataTable :value="users" :resizableColumns="true" editMode="cell" columnResizeMode="expand" class="editable-cells-table">
      <Column field="_id" header="User-ID"></Column>
      <Column field="username" header="Name">
        <template #editor="slotProps">
            <InputText v-model="slotProps.data[slotProps.column.props.field]" />
        </template>
        </Column>
      <Column field="password" header="Passwort">
      </Column>
      <Column field="email" header="E-Mail">
        <template #editor="slotProps">
            <InputText v-model="slotProps.data[slotProps.column.props.field]" />
        </template>
      </Column>
      <Column field="role" header="Rols">
        <template #editor="slotProps">
          <Dropdown v-model="slotProps.data['role']" :options="userRoles" optionLabel="label" optionValue="value" laceholder="Select a Status" appendTo="body">
              <template #option="slotProps">
                  <span :class="'product-badge status-' + slotProps.option.value.toLowerCase()">{{slotProps.option.label}}</span>
              </template>
          </Dropdown>
        </template>
        <template #body="slotProps">
              {{getStatusLabel(slotProps.data.role)}}
          </template>  
      </Column>
      <Column :exportable="false">
        <template #body="slotProps">
            <Button icon="pi pi-save" class="p-button-rounded p-button-success p-mr-2" @click="updateUser(slotProps.data)" />
            <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="deleteUser(slotProps.data)" />
        </template>
    </Column>
    </DataTable> 
    <ConfirmPopup></ConfirmPopup>
    </div>
  </div> 
</template>

<script>
import { ref, onMounted } from "vue"
import DataTable from 'primevue/datatable'
import VueCookies from 'vue-cookies'
//import { useConfirm } from "primevue/useconfirm";
export default {
  name: 'userManagement',

  setup(props) {
    /** System Variables */
    const axios = require("axios");
    const User = require('../models/signupUserDTO');
    const axiosAuthHeader = {
          headers: {
            Authorization: VueCookies.get('access-token')
          }
    }

    /** Tabel Variables */
    const userRoles = ref([{label: 'Admin', value: 'admin'},{label: 'User', value: 'user'},{label: 'Lecturer', value: 'lecturer'}])

    /** User Variables */
    const users = ref([{_id: "1234567890123456789012345678901234567890", username: 'Philipp', password: '1234567890123456789012345678901234567890', email: 'test', role: 'admin'},{_id: 2, username: 'Simon', password: '567', email: 'test', role: 'admin'}])
    //const users = ref('')

    async function getUsers(){
      //console.log(axiosAuthHeader)
      const resp = await axios.get('http://localhost:3000/user/getUsers', axiosAuthHeader)
      //console.log(resp.data)
      users.value = resp.data
      return users
    }

    async function createUser(){
      users.value.unshift({})
    }

    async function updateUser(user){
      console.log(user)
      if (user._id){
        console.log("ID gesetzt -> Update")
        axios.put('http://localhost:3000/user', user, axiosAuthHeader).then( function (){getUsers()})
        return
      }
      if(user.username && user.password && user.email /**&& user.roles**/){

        axios.post('http://localhost:3000/auth/register', user, axiosAuthHeader).then( function (){getUsers()})
        return
      }
      console.log('Fehlerhafte Eingabe')
    }

    async function deleteUser(user){
                                console.log(user)
                        //users.value.splice(user, 1)
                        axios.delete('http://localhost:3000/user', {data: {user}, headers: axiosAuthHeader}).then( function(){getUsers()})
            /**const confirm = useConfirm();
            confirm.require({
                message: 'Willst du den User '+user.username+' wirklich löschen?',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                },
                reject: () => {
                    //callback to execute when user rejects the action
                }
            });**/
    }

    function selectUser(ID){
      const selectedUserRoot = "http://localhost:3000/user/" + ID;
      return selectedUserRoot;
    }

    function getStatusLabel(status) {
      console.log(status)
            switch(status) {
                case 'admin':
                    return 'Admin';

                case 'user':
                    return 'User';

                case 'lecturer':
                    return 'Lecturer';

                default:
                    return 'NA';
            }
        }

    onMounted(getUsers())

    return {
    /**Variables */
      users,
      userRoles,

    /** Methods */
      getUsers,
      deleteUser,
      getStatusLabel,
      updateUser,
      createUser,
    }
  }  
}
</script>
<style>
.ui-table-wrapper{
  overflow: visible
}
</style>