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
        <template #editor="slotProps">
            <InputText v-model="slotProps.data[slotProps.column.props.field]" />
        </template>
      </Column>
      <Column field="email" header="E-Mail">
        <template #editor="slotProps">
            <InputText v-model="slotProps.data[slotProps.column.props.field]" />
        </template>
      </Column>
      <Column field="roles" header="Rols">
      <template #editor="slotProps">
        <Dropdown v-model="slotProps.data['roles']" :options="userRoles" optionLabel="label" optionValue="value" laceholder="Select a Status">
            <template #option="slotProps">
                <span :class="'product-badge status-' + slotProps.option.value.toLowerCase()">{{slotProps.option.label}}</span>
            </template>
        </Dropdown>
      </template>
      <template #body="slotProps">
            {{getStatusLabel(slotProps.data.roles)}}
        </template>  
      </Column>
      <Column :exportable="false">
        <template #body="slotProps">
            <Button icon="pi pi-pencil" class="p-button-rounded p-button-success p-mr-2" @click="updateUser(slotProps.data)" />
            <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="deleteUser(slotProps.data)" />
        </template>
    </Column>
    </DataTable> 
    </div>
  </div> 
</template>

<script>
import { ref, onMounted } from "vue"
import DataTable from 'primevue/datatable'
import VueCookies from 'vue-cookies'
export default {
  name: 'userManagement',


  setup(props) {
    /** System Variables */
    const axios = require("axios");
    const axiosAuthHeader = {
          headers: {
            Authorization: VueCookies.get('access-token')
          }
    }

    /** Tabel Variables */
    const userRoles = ref([{label: 'Admin', value: 'admin'},{label: 'User', value: 'user'},{label: 'Lecturer', value: 'lecturer'}])




    /** User Variables */
    const users = ref([{_id: 1, username: 'Philipp', password: '234', email: 'test', roles: 'admin'},{_id: 2, username: 'Simon', password: '567', email: 'test', roles: 'admin'}])
    //const users = ref('')

    function getStatusLabel(status) {
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

    async function getUsers(){
      console.log(axiosAuthHeader)
      const resp = await axios.get('http://localhost:3000/user/getUsers', axiosAuthHeader)
      console.log(resp.data)
      users.value = resp.data
      return users
    }

    function createUser(){
      users.value.unshift({})
    }

    async function updateUser(user){
      console.log(user)
      if (user._id){
        await axios.patch(selectUser(user._id), user, axiosAuthHeader)
        return
        }
      if(user.username && user.password && user.email && user.roles){
        await axios.post('http://localhost:3000/user', user, axiosAuthHeader)
        return
      }
      console.log('Fehlerhafte Eingabe')
    }

    async function deleteUser(user){
      users.value.splice(user, 1)
      await axios.delete(selectUser(user._id), axiosAuthHeader);
    }

    function selectUser(ID){
      const selectedUserRoot = "http://localhost:3000" + ID;
      return selectedUserRoot;
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