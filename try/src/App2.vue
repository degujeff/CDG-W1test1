<!-- <template>
  <v-app>
    <v-main class="d-flex flex-column align-center pt-10" style="background-color: #f5f5f5;">

      <UserForm 
        :isEditing="isEditing"
        :loading="loading"
        :initialData="editingUser"
        @submit="handleSaveData"
        @cancel="cancelEdit"
      />

      <v-alert 
        v-if="message" 
        :type="alertType" 
        class="mt-4 mb-4" 
        variant="tonal" 
        width="600"
      >
        {{ message }}
      </v-alert>

      <UserTable 
        :users="users"
        @edit="prepareEdit"
        @delete="handleDeleteUser"
      />

    </v-main>
  </v-app>
</template>

<script setup>
// ==========================================
// 1. Imports (เรียงลำดับความสำคัญ)
// ==========================================
import { ref, onMounted } from 'vue';          // Core Vue
import UserForm from './components/UserForm.vue'; // Components
import UserTable from './components/UserTable.vue';

// ==========================================
// 2. Constants & Configuration
// ==========================================
const API_URL = 'http://localhost:3001/users';

// ==========================================
// 3. State Management (ตัวแปร)
// ==========================================
// 3.1 Data State (ข้อมูลหลัก)
const users = ref([]); 
const loading = ref(false);

// 3.2 UI State (หน้าตาและการแจ้งเตือน)
const message = ref('');
const alertType = ref('success');

// 3.3 Editing State (สถานะการแก้ไข)
const isEditing = ref(false);
const currentId = ref(null);
const editingUser = ref({ name: '', email: '' }); // ส่งไปให้ Form

// ==========================================
// 4. API Functions (ติดต่อหลังบ้าน)
// ==========================================
// ฟังก์ชันดึงข้อมูล (Read)
const fetchUsers = async () => {
  try {
    const response = await fetch(API_URL);
    users.value = await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    showMessage('ดึงข้อมูลไม่สำเร็จ', 'error');
  }
};

// ฟังก์ชันบันทึกข้อมูล (Create & Update)
const handleSaveData = async (formData) => {
  loading.value = true;
  message.value = '';

  try {
    // กำหนด URL และ Method ตามสถานะ (เพิ่มใหม่ หรือ แก้ไข)
    const url = isEditing.value ? `${API_URL}/${currentId.value}` : API_URL;
    const method = isEditing.value ? 'PATCH' : 'POST';

    const response = await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!response.ok) throw new Error('Action failed');

    // ถ้าสำเร็จ
    showMessage(
      isEditing.value ? '✅ แก้ไขข้อมูลสำเร็จ!' : '✅ บันทึกข้อมูลสำเร็จ!', 
      'success'
    );
    cancelEdit(); // รีเซ็ตฟอร์ม
    fetchUsers(); // อัปเดตตาราง

  } catch (error) {
    showMessage('⚠️ ทำรายการไม่สำเร็จ (ตรวจสอบข้อมูลหรือ Server)', 'warning');
  } finally {
    loading.value = false;
  }
};

// ฟังก์ชันลบข้อมูล (Delete)
const handleDeleteUser = async (id) => {
  if (!confirm('ยืนยันที่จะลบข้อมูลนี้หรือไม่?')) return;
  
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (response.ok) {
      fetchUsers();
      showMessage('🗑️ ลบข้อมูลเรียบร้อย', 'success');
    }
  } catch (error) {
    showMessage('ลบไม่สำเร็จ', 'error');
  }
};

// ==========================================
// 5. Helper Functions (ฟังก์ชันช่วยทำงานทั่วไป)
// ==========================================
// เตรียมข้อมูลสำหรับแก้ไข (ถูกเรียกเมื่อกดปุ่มดินสอใน UserTable)
const prepareEdit = (user) => {
  editingUser.value = { name: user.name, email: user.email };
  currentId.value = user.id;
  isEditing.value = true;
};

// ยกเลิกการแก้ไข (ถูกเรียกเมื่อกดปุ่มยกเลิกใน UserForm)
const cancelEdit = () => {
  editingUser.value = { name: '', email: '' };
  currentId.value = null;
  isEditing.value = false;
  message.value = ''; // เคลียร์ข้อความแจ้งเตือนด้วย
};

// ฟังก์ชันแสดงข้อความแจ้งเตือน (ลดการเขียนซ้ำ)
const showMessage = (msg, type = 'success') => {
  message.value = msg;
  alertType.value = type;
  // ตั้งเวลาให้ข้อความหายไปเองใน 3 วินาที (Optional - ใส่เพิ่มให้ดูโปร)
  setTimeout(() => { message.value = ''; }, 3000);
};

// ==========================================
// 6. Lifecycle Hooks (เริ่มทำงาน)
// ==========================================
onMounted(() => {
  fetchUsers();
});
</script> -->