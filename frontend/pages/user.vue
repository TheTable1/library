<!-- pages/users.vue -->
<template>
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <AppSidebar />

    <!-- Content -->
    <main class="flex-1 bg-gray-50 p-6">
      <div class="w-full">
        <div class="bg-white shadow-sm rounded-lg p-6">
          <!-- Header -->
          <div class="mb-6">
            <h1 class="text-3xl font-bold text-gray-900">User Management</h1>
            <p class="text-gray-600 mt-2">Manage and view all users in the system</p>
          </div>

          <!-- Loading State -->
          <div v-if="loading" class="flex items-center justify-center py-12">
            <div class="flex items-center space-x-2 text-gray-600">
              <UIcon name="i-lucide-loader-2" class="animate-spin" />
              <span>Loading users...</span>
            </div>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
            <div class="flex items-center space-x-2 text-red-700">
              <UIcon name="i-lucide-alert-circle" />
              <span>{{ error }}</span>
            </div>
          </div>

          <!-- Users Table -->
          <div v-else class="overflow-x-auto">
            <table class="w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No.</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="(user, i) in users" :key="user.id">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ i + 1 }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ user.id }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                        <UIcon name="i-lucide-user" class="text-gray-600 text-sm" />
                      </div>
                      <div class="ml-3">
                        <div class="text-sm font-medium text-gray-900">
                          {{ user.firstName }} {{ user.lastName }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.email }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                      :class="getRoleColor(user.role)"
                    >
                      {{ user.role }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex space-x-2">
                      <UButton variant="ghost" size="sm" icon="i-lucide-eye" @click="viewUser(user)" />
                      <UButton variant="ghost" size="sm" icon="i-lucide-edit" @click="editUser(user)" />
                      <UButton variant="ghost" size="sm" icon="i-lucide-trash" @click="deleteUser(user)" />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- Empty State -->
            <div v-if="users.length === 0" class="text-center py-12">
              <UIcon name="i-lucide-users" class="text-gray-400 text-4xl mb-4" />
              <h3 class="text-lg font-medium text-gray-900 mb-2">No users found</h3>
              <p class="text-gray-500">Get started by adding your first user.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import AppSidebar from '@/components/AppSidebar.vue'
import { ref, onMounted } from 'vue'

const users   = ref([])
const loading = ref(false)
const error   = ref('')

function getToken() {
  return localStorage.getItem('token') || ''
}

function getRoleColor(role) {
  const colors = {
    admin: 'bg-green-100 text-green-800',
    user:  'bg-blue-100 text-blue-800',
  }
  return colors[role.toLowerCase()] || 'bg-gray-100 text-gray-800'
}

async function fetchUsers() {
  loading.value = true
  error.value = ''
  try {
    const res = await $fetch('/users', {
      baseURL: 'http://localhost:3000',
      headers: { Authorization: `Bearer ${getToken()}` }
    })
    users.value = res.data
  } catch (e) {
    error.value = e.data?.message || e.message || 'Failed to load users'
  } finally {
    loading.value = false
  }
}

function viewUser(user) {
  window.location.href = `/users/${user.id}`
}

function editUser(user) {
  window.location.href = `/users/${user.id}/edit`
}

async function deleteUser(user) {
  if (!confirm(`Are you sure you want to delete ${user.firstName} ${user.lastName}?`))
    return
  try {
    await $fetch(`/users/${user.id}`, {
      method:  'DELETE',
      baseURL: 'http://localhost:3000',
      headers: { Authorization: `Bearer ${getToken()}` }
    })
    await fetchUsers()
  } catch (e) {
    error.value = e.data?.message || e.message || 'Failed to delete user'
  }
}

onMounted(fetchUsers)
</script>
