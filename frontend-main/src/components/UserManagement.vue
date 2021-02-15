<template>
  <div class="UserManagement">
    <h1>User Management</h1>
    <div>
      <ConfirmDialog></ConfirmDialog>
      <Button
        icon="pi pi-user-plus"
        label="Add User"
        @click="createUser()"
      ></Button>
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
        <!-- TODO: Wie soll passwort angezeigt werden? -->
        <Column field="password" header="Passwort"> </Column>
        <Column field="email" header="E-Mail">
          <template #editor="slotProps">
            <InputText v-model="slotProps.data[slotProps.column.props.field]" />
          </template>
        </Column>
        <Column field="role" header="Roles">
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
                  :class="
                    'product-badge status-' +
                    slotProps.option.value.toLowerCase()
                  "
                  >{{ slotProps.option.label }}</span
                >
              </template>
            </Dropdown>
          </template>
          <template #body="slotProps">
            {{ getUserRole(slotProps.data.role) }}
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
// import { useConfirm } from "primevue/useConfirm";
import {
  postBackendRequest,
  putBackendRequest,
  getBackendRequest,
  deleteBackendRequest,
} from "../helper/requests";

export default defineComponent({
  setup(props) {
    /** System Variables */
    // const confirm = useConfirm();
    const REGISTER_PATH = "auth/register";
    const USER_PATH = "user";
    // confirm.require({
    //   message: "Are you sure you want to proceed?",
    //   icon: "pi pi-exclamation-triangle",
    //   accept: () => {
    //     //callback to execute when user confirms the action
    //   },
    //   reject: () => {
    //     //callback to execute when user rejects the action
    //   },
    // });

    /** Tabel Variables */
    const USER_ROLES = [
      { label: "Admin", value: "admin" },
      { label: "User", value: "user" },
      { label: "Lecturer", value: "lecturer" },
    ];

    //TODO: remove for Prod
    /** User Variables */
    const users = ref([
      {
        _id: "1234567890123456789012345678901234567890",
        username: "Philipp",
        password: "1234567890123456789012345678901234567890",
        email: "test",
        role: "admin",
      },
      {
        _id: 2,
        username: "Simon",
        password: "567",
        email: "test",
        role: "admin",
      },
    ]);

    async function getUsers() {
      if (process.env.VUE_APP_BACKEND_ONLINE) {
        const response = await getBackendRequest("user/getUsers");
        users.value = response.data;
      }
      return users;
    }

    function createUser() {
      users.value.unshift({});
    }

    async function updateUser(user) {
      try {
        if (user._id) {
          await putBackendRequest(USER_PATH, user)
          getUsers()
          return
        }else if (
          user.username &&
          user.email &&
          user.roles
        ) {
          await postBackendRequest(REGISTER_PATH, user)
          getUsers()
          return
        }
      } catch (error) {
        console.log(error);
      }
    }

    //TODO: Payload in URL oder Header/Body
    async function deleteUser(user) {
      this.$confirm.require({
        message:
          "Möchten sie den Nutzer " + user.username + " wirklich löschen?",
        header: "Nutzer löschen",
        icon: "pi pi-exclamation-triangle",
        accept: async () => {
          try {
            const response = await deleteBackendRequest(
              USER_PATH + "/" + user._id
            ).then(function () {
              getUsers();
            });
          } catch (error) {
            console.log(error);
          }
        },
        reject: () => {
          //callback to execute when user rejects the action
        },
      });
    }

    function getUserRole(status) {
      let selectedRole = USER_ROLES.find(role => role.value == status);
      return selectedRole?.label;
    }

    onMounted(getUsers());

    return {
      /**Variables */
      users,
      USER_ROLES,

      /** Methods */
      getUsers,
      deleteUser,
      getUserRole,
      updateUser,
      createUser,
    };
  },
});
</script>

<style>
.ui-table-wrapper {
  overflow: visible;
}
.p-button {
  margin: 3px;
}
</style>
