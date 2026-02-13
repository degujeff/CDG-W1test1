<script setup>
import { ref, onMounted } from 'vue';
import { UserService } from './services/Userservice';
import UserTable from './components/UserTable.vue';
import UserForm from './components/UserForm.vue';


const users = ref([]);
const isEditing = ref(false);
const editingId = ref(null);
const userToEdit = ref(null);

const loadUsers = async () => {
    users.value = await UserService.getAll();
}

const handleSave = async (formData) => {
    if (isEditing.value) {
        await UserService.update(editingId.value, formData);
        resetState();
    } else {
        await UserService.create(formData);
    }
    loadUsers();
}

const handleDelete = async (id) => {
    if(confirm('ยืนยันการลบ?')) {
        await UserService.delete(id);
        loadUsers();
    }
}

const handleEditRequest = (user) => {
    editingId.value = user.id;
    userToEdit.value = user;
    isEditing.value = true;
}

const resetState = () => {
    isEditing.value = false;
    userToEdit.value = null;
    editingId.value = null;
}

onMounted(loadUsers);
</script>

<template>
  <v-app>
    <v-main>
      <v-container> <h1 class="text-h4 mb-5 text-primary">ระบบจัดการสมาชิก (Vuetify Edition) ✨</h1>
        
        <v-row>
          <v-col cols="12" md="4">
            <UserForm 
                :is-editing="isEditing"
                :user-data="userToEdit"
                @submit-data="handleSave"
                @cancel="resetState"
            />
          </v-col>

          <v-col cols="12" md="8">
            <UserTable 
                :users="users"
                @delete-user="handleDelete"
                @edit-user="handleEditRequest"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>