<script setup>
import { ref, onMounted } from 'vue';
import { UserService } from './services/Userservice';
import UserTable from './components/UserTable.vue';
import UserForm from './components/UserForm.vue';
import { Toast, Confirm } from './utils/sweetalert';



const users = ref([]);
const isEditing = ref(false);
const editingId = ref(null);
const userToEdit = ref(null);

const loadUsers = async () => {
    users.value = await UserService.getAll();
}

const handleSave = async (formData) => {
    // 1. ต้องเริ่มด้วย try เสมอ (ถ้าจะมี catch)
    try {
        if (isEditing.value) {
            await UserService.update(editingId.value, formData);
            
            // แจ้งเตือนแก้ไข
            Toast.fire({
                icon: 'success',
                title: 'แก้ไขข้อมูลเรียบร้อยแล้ว'
            })
        } else {
            await UserService.create(formData);
            
            // แจ้งเตือนสร้างใหม่
            Toast.fire({
                icon: 'success',
                title: 'เพิ่มสมาชิกใหม่สำเร็จ'
            })
        }

        // 2. ทำงานเสร็จค่อยรีเซ็ตทีเดียว (ไม่ต้องเขียนซ้ำใน if/else)
        resetState();
        loadUsers();

    } catch (error) {
        // 3. ถ้ามี Error จะกระโดดมาตรงนี้ทันที
        console.error(error); // (แอบดู Error จริงใน Console หน่อย)
        
        Toast.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด ลองใหม่อีกครั้งนะ'
        })
    }
}

const handleDelete = async (id) => {
    // 1. เด้งถามก่อน
    const result = await Confirm.fire()

    // 2. เช็คว่า "กดปุ่มตกลง (Yes)" หรือไม่?
    if (result.isConfirmed) {
        try {
            // ถ้าตกลง ค่อยลบจริง
            await UserService.delete(id);
            loadUsers();
          
            Toast.fire({
                icon: 'success',
                title: 'ลบข้อมูลเรียบร้อย'
            })
        } catch (error) {
            console.error(error);
            Toast.fire({
                icon: 'error',
                title: 'ลบไม่สำเร็จ'
            })
        }
    }
    // ถ้ากด "ยกเลิก" ก็จะไม่ทำอะไรเลย (จบฟังก์ชัน)
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
      <router-view /> 
    </v-main>
  </v-app>
</template>