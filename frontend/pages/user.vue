<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-[#1f2937] text-gray-300">
      <NavBar />
    </aside>

    <!-- Main content -->
    <main class="flex-1 p-10">
      <div class="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
        <h1 class="text-2xl font-bold mb-6 text-gray-800">User List</h1>
  
        <div v-if="loading" class="text-center py-10">
          Loading users…
        </div>
        <div v-else-if="error" class="text-red-600">
          {{ error }}
        </div>
        <table v-else class="min-w-full table-auto">
          <thead>
            <tr class="bg-gray-200 text-gray-700">
              <th class="px-4 py-2">ID</th>
              <th class="px-4 py-2">First Name</th>
              <th class="px-4 py-2">Last Name</th>
              <th class="px-4 py-2">Email</th>
              <th class="px-4 py-2">Role</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="user in users"
              :key="user.id"
              class="hover:bg-gray-50"
            >
              <td class="border px-4 py-2">{{ user.id }}</td>
              <td class="border px-4 py-2">{{ user.firstName }}</td>
              <td class="border px-4 py-2">{{ user.lastName }}</td>
              <td class="border px-4 py-2">{{ user.email }}</td>
              <td class="border px-4 py-2">{{ user.role }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import NavBar from '~/components/NavBar.vue'

// reactive state
const users = ref([])
const loading = ref(false)
const error = ref('')

// helper: ดึง token
function getToken() {
  return localStorage.getItem('token') || ''
}

// ดึงข้อมูล users
async function fetchUsers() {
  loading.value = true
  error.value = ''
  try {
    const token = getToken()
    const res = await $fetch('/users', {
      baseURL: 'http://localhost:3000',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    users.value = res.data
  } catch (e) {
    error.value = e.data?.message || e.message || 'Failed to load users'
  } finally {
    loading.value = false
  }
}

// เมื่อ component mount ให้ fetch
onMounted(fetchUsers)
</script>
