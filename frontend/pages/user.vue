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
            <button>
              
            </button>
            <table class="w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No.</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions
                  </th>
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
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                      :class="getRoleColor(user.role)">
                      {{ user.role }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex space-x-2">
                      <UButton variant="ghost" size="sm" icon="i-lucide-eye" @click="viewUser(user)" />
                      <UButton variant="ghost" size="sm" icon="i-lucide-edit" @click="openEdit(user)" />
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

            <!-- Edit User Modal -->
            <div v-if="showEdit"
              class="fixed inset-0 bg-gradient-to-br from-black/50 to-gray-900/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
              <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg transform transition-all duration-300 scale-100 ">
                <div class="bg-darkblue rounded-t-2xl p-6 text-white relative overflow-hidden">
                  <div class="relative z-10 flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                      <div class="p-2 bg-white/20 rounded-full">
                        <UIcon name="i-lucide-user-pen" class="text-xl" />
                      </div>
                      <h2 class="text-2xl font-bold">Edit User Profile</h2>
                    </div>
                    <button @click="closeEdit"
                      class="p-2 hover:bg-white/20 rounded-full transition-colors duration-200">
                      <UIcon name="i-lucide-x" class="text-xl" />
                    </button>
                  </div>
                </div>

                <!-- Form Content -->
                <div class="p-6">
                  <form @submit.prevent="submitEdit" class="space-y-5">
                    <!-- Name Fields Row -->
                    <div class="grid grid-cols-2 gap-4">
                      <div class="group">
                        <label class="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                          <UIcon name="i-lucide-user" class="text-blue-500" />
                          <span>First Name</span>
                        </label>
                        <input v-model="editForm.firstName" type="text" placeholder="Enter first name"
                          class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 group-hover:border-gray-300 text-black" />
                      </div>
                      <div class="group">
                        <label class="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                          <UIcon name="i-lucide-user" class="text-blue-500" />
                          <span>Last Name</span>
                        </label>
                        <input v-model="editForm.lastName" type="text" placeholder="Enter last name"
                          class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 group-hover:border-gray-300 text-black" />
                      </div>
                    </div>

                    <!-- Email Field -->
                    <div class="group">
                      <label class="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                        <UIcon name="i-lucide-mail" class="text-green-500" />
                        <span>Email Address</span>
                      </label>
                      <input v-model="editForm.email" type="email" placeholder="Enter email address"
                        class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200 group-hover:border-gray-300 text-black" />
                    </div>

                    <!-- Role and Phone Row -->
                    <div class="grid grid-cols-2 gap-4">
                      <div class="group">
                        <label class="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                          <UIcon name="i-lucide-shield-check" class="text-purple-500" />
                          <span>Role</span>
                        </label>
                        <select v-model="editForm.role"
                          class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 group-hover:border-gray-300 bg-white text-black">
                          <option value="user" class="text-black">👤 User</option>
                          <option value="admin" class="text-black">⚡ Admin</option>
                        </select>
                      </div>
                      <div class="group">
                        <label class="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                          <UIcon name="i-lucide-phone" class="text-orange-500" />
                          <span>Phone Number</span>
                        </label>
                        <input v-model="editForm.phone" type="text" placeholder="Enter phone number"
                          class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 group-hover:border-gray-300 text-black" />
                      </div>
                    </div>

                    <!-- Address Field -->
                    <div class="group">
                      <label class="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                        <UIcon name="i-lucide-map-pin" class="text-red-500" />
                        <span>Address</span>
                      </label>
                      <textarea v-model="editForm.address" placeholder="Enter full address" rows="3"
                        class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200 group-hover:border-gray-300 resize-none text-black"></textarea>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                      <button type="button" @click="closeEdit"
                        class="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 flex items-center space-x-2">
                        <UIcon name="i-lucide-x" class="text-sm" />
                        <span>Cancel</span>
                      </button>
                      <button type="submit"
                        class="px-6 py-3 bg-darkblue text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-2">
                        <UIcon name="i-lucide-save" class="text-sm" />
                        <span>Save Changes</span>
                      </button>
                    </div>
                  </form>
                </div>

                <!-- Loading Overlay (if needed) -->
                <div v-if="isSubmitting"
                  class="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <div class="flex flex-col items-center space-y-3">
                    <UIcon name="i-lucide-loader-2" class="text-3xl text-blue-600 animate-spin" />
                    <span class="text-gray-600 font-medium">Saving changes...</span>
                  </div>
                </div>
              </div>
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
import { useRouter } from 'vue-router'

const router     = useRouter()
const users      = ref([])
const loading    = ref(false)
const error      = ref('')
const showEdit   = ref(false)
const editForm   = ref({
  id:         null,
  firstName:  '',
  lastName:   '',
  email:      '',
  role:       '',
  phone:      '',
  address:    ''
})

function getToken() {
  return localStorage.getItem('token') || ''
}

function getRoleColor(role) {
  const colors = {
    admin: 'bg-green-100 text-green-800',
    user:  'bg-blue-100 text-blue-800'
  }
  return colors[role.toLowerCase()] || 'bg-gray-100 text-gray-800'
}

async function fetchUsers() {
  loading.value = true
  error.value   = ''
  try {
    const res = await $fetch('/users', {
      baseURL:   'http://localhost:3000',
      headers:   { Authorization: `Bearer ${getToken()}` }
    })
    users.value = res.data
  } catch (e) {
    error.value = e.data?.message || e.message || 'Failed to load users'
  } finally {
    loading.value = false
  }
}

function viewUser(user) {
  router.push(`/users/${user.id}`)
}

async function openEdit(user) {
  showEdit.value = true
  try {
    const res = await $fetch(`/users/${user.id}`, {
      baseURL:   'http://localhost:3000',
      headers:   { Authorization: `Bearer ${getToken()}` }
    })
    const u = res.data
    editForm.value = {
      id:         u.id,
      firstName:  u.firstName,
      lastName:   u.lastName,
      email:      u.email,
      role:       u.role,
      phone:      u.phone,
      address:    u.address
    }
  } catch (e) {
    error.value = e.data?.message || e.message || 'Failed to load user'
  }
}

function closeEdit() {
  showEdit.value = false
}

async function submitEdit() {
  const { id, firstName, lastName, email, role, phone, address } = editForm.value
  try {
    await $fetch(`/users/${id}`, {
      method:  'PUT',
      baseURL: 'http://localhost:3000',
      headers: { Authorization: `Bearer ${getToken()}` },
      body:    { fName: firstName, lName: lastName, email, role, phone, address }
    })
    await fetchUsers()
    closeEdit()
  } catch (e) {
    error.value = e.data?.message || e.message || 'Failed to update user'
  }
}

async function deleteUser(user) {
  if (!confirm(`Are you sure you want to delete ${user.firstName} ${user.lastName}?`)) return
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
