<script setup>
defineProps({ users: Array })
defineEmits(['delete-user', 'edit-user'])


const headers = [
  { title: 'ชื่อสมาชิก', key: 'name', align: 'start' },
  { title: 'อีเมล', key: 'email' },
  { title: 'จัดการ', key: 'actions', sortable: false }, 
]
</script>

<template>
  <v-card elevation="2"> <v-card-title>รายชื่อทั้งหมด</v-card-title>
    
    <v-data-table
      :headers="headers"
      :items="users"
      items-per-page="5"
    >
      <template v-slot:item.actions="{ item }">
        
        <v-btn 
          icon="mdi-pencil" 
          size="small" 
          color="warning" 
          class="mr-2"
          @click="$emit('edit-user', item)"
        >
            ✏️
        </v-btn>

        <v-btn 
          icon="mdi-delete" 
          size="small" 
          color="error"
          @click="$emit('delete-user', item.id)"
        >
            🗑️
        </v-btn>
      </template>
      
    </v-data-table>
  </v-card>
</template>