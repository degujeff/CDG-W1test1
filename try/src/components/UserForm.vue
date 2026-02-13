<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    isEditing: Boolean,
    userData: Object
})

const emit = defineEmits(['submit-data', 'cancel'])

const name = ref('');
const email = ref('');
// เพิ่มตัวแปรเช็กว่าฟอร์มกรอกครบไหม อิอิอิ
const formValid = ref(false);

watch(() => props.userData, (newVal) => {
    if (newVal) {
        name.value = newVal.name;
        email.value = newVal.email;
    }
})

const handleSubmit = () => {
    emit('submit-data', { name: name.value, email: email.value });
    if (!props.isEditing) {
        name.value = '';
        email.value = '';
    }
}
</script>

<template>
  <v-card elevation="2" class="pa-4">
    <v-card-title class="text-center">
      <span :class="isEditing ? 'text-warning' : 'text-success'">
        {{ isEditing ? '✏️ แก้ไขข้อมูล' : '✨ เพิ่มสมาชิกใหม่' }}
      </span>
    </v-card-title>

    <v-card-text>
      <v-form v-model="formValid" @submit.prevent="handleSubmit">
        <v-text-field
          v-model="name"
          label="กรอกชื่อ"
          variant="outlined"
          prepend-inner-icon="mdi-account"
          class="mb-2"
        ></v-text-field>

        <v-text-field
          v-model="email"
          label="กรอกอีเมล"
          variant="outlined"
          prepend-inner-icon="mdi-email"
        ></v-text-field>

        <v-btn 
            v-if="!isEditing" 
            color="success" 
            block 
            size="large"
            @click="handleSubmit"
        >
            บันทึกข้อมูล
        </v-btn>

        <div v-else class="d-flex gap-2">
            <v-btn color="warning" flex-grow-1 @click="handleSubmit">
                อัปเดต
            </v-btn>
            <v-btn color="grey" variant="text" @click="$emit('cancel')">
                ยกเลิก
            </v-btn>
        </div>

      </v-form>
    </v-card-text>
  </v-card>
</template>
