<template>
  <div class="UserManagement">
    <h1>User Management</h1>
    <div>
      <ConfirmDialog></ConfirmDialog>
      <Button icon="pi pi-user-plus" label="Add User" @click="createUser()"></Button>
    </div>
    <div>
      <DataTable
        :value="users"
        :resizableColumns="true"
        editMode="cell"
        columnResizeMode="expand"
        class="editable-cells-table"
      >
        <Column field="_id" header="User-ID"></Column>
        <Column field="username" header="Name">
          <template #editor="slotProps">
            <InputText v-model="slotProps.data[slotProps.column.props.field]" />
          </template>
        </Column>
        <Column field="password" header="Passwort"> </Column>
        <Column field="email" header="E-Mail">
          <template #editor="slotProps">
            <InputText v-model="slotProps.data[slotProps.column.props.field]" />
          </template>
        </Column>
        <Column field="role" header="Rols">
          <template #editor="slotProps">
            <Dropdown
              v-model="slotProps.data['role']"
              :options="USER_ROLES"
              optionLabel="label"
              optionValue="value"
              laceholder="Select a Status"
              appendTo="body"
            >
              <template #option="slotProps">
                <span
                  :class="'product-badge status-' + slotProps.option.value.toLowerCase()"
                  >{{ slotProps.option.label }}</span
                >
              </template>
            </Dropdown>
          </template>
          <template #body="slotProps">
            {{ setUserRole(slotProps.data.role) }}
          </template>
        </Column>
        <Column :exportable="false">
          <template #body="slotProps">
            <Button
              icon="pi pi-save"
              class="p-button-rounded p-button-success p-mr-2"
              @click="updateUser(slotProps.data)"
            />
            <ConfirmPopup></ConfirmPopup>
            <Button
              icon="pi pi-trash"
              class="p-button-rounded p-button-warning"
              @click="deleteUser(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import DataTable from "primevue/datatable";
import { defineComponent } from "vue";
import VueCookies from "vue-cookies";
import { useConfirm } from "primevue/useConfirm";
import { postBackendRequest, putBackendRequest, getBackendRequest, deleteBackendRequest } from "../helper/requests";


export default defineComponent({
  setup(props) {
    /** System Variables */
    const confirm = useConfirm();
    const REGISTER_PATH = "auth/register"
    const USER_PATH = 'user'
    confirm.require({
      message: "Are you sure you want to proceed?",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        //callback to execute when user confirms the action
      },
      reject: () => {
        //callback to execute when user rejects the action
      },
    });

    /** Tabel Variables */
    const USER_ROLES = [
      { label: "Admin", value: "admin" },
      { label: "User", value: "user" },
      { label: "Lecturer", value: "lecturer" },
    ]

    /** User Variables */
    const users = ref([
      {
        _id: "1234567890123456789012345678901234567890",
        username: "Philipp",
        password: "1234567890123456789012345678901234567890",
        email: "test",
        role: "admin",
      },
      { _id: 2, username: "Simon", password: "567", email: "test", role: "admin" },
    ]);

    async function getUsers() {
/*       const response = getBackendRequest('user/getUsers')
      users.value = response.data */
      return users
    }

    async function createUser() {
      users.value.unshift({})
    }

    async function updateUser(user) {
      try{
      if (user._id) {
        const response = putBackendRequest(USER_PATH, user).then(function() {
          getUsers()
        })
        return
      }
      if (user.username && user.password && user.email && user.roles && !user._id) {
        const response = postBackendRequest(REGISTER_PATH, user).then(function(){
          getUsers()
        })
        return
      }
      } catch (error){
        console.log(error)
      }
    }

    async function deleteUser(user) {
      this.$confirm.require({
        message: "Möchten sie den Nutzer " + user.username + " wirklich löschen?",
        header: "Nutzer löschen",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          try{
            const response = deleteBackendRequest(USER_PATH + '/' + user._id).then(function() {
              getUsers()
            })
          } catch (error) {
            console.log(error)
          }
/*           axios
            .delete("http://localhost:3000/user", {
              data: { user },
              headers: axiosAuthHeader,
            })
            .then(function () {
              getUsers();
            }); */
        },
        reject: () => {
          //callback to execute when user rejects the action
        },
      });
    }

    function setUserRole(status) {
      console.log(status)
      switch (status) {
        case "admin":
          return "Admin"

        case "user":
          return "User"

        case "lecturer":
          return "Lecturer"

        default:
          return "NA"
      }
    }

    onMounted(getUsers())

    return {
      /**Variables */
      users,
      USER_ROLES,

      /** Methods */
      getUsers,
      deleteUser,
      setUserRole,
      updateUser,
      createUser,
    }
  },
})
</script>

<style>
.ui-table-wrapper {
  overflow: visible;
}
</style>
