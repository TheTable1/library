<!-- pages/users.vue -->
<template>
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <AppSidebar />

    <!-- Content -->
    <main class="flex-1 bg-gray-50 p-6">
      <div class="w-full bg-white shadow-sm rounded-lg p-6">
        <!-- Header + Search -->
        <div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">User Management</h1>
            <p class="text-gray-600 mt-1">Manage and view all users in the system</p>
          </div>
          <div class="mt-4 sm:mt-0">
            <div class="relative mt-4">
              <UIcon name="i-lucide-search" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input v-model="searchQuery" type="text" placeholder="Search by name..."
                class="pl-10 pr-4 py-2 border rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-200 text-darkblue" />
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex items-center justify-center py-12">
          <div class="flex items-center space-x-2 text-gray-600">
            <UIcon name="i-lucide-loader-2" class="animate-spin" />
            <span>Loading users...</span>
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div class="flex items-center space-x-2 text-red-700">
            <UIcon name="i-lucide-alert-circle" />
            <span>{{ error }}</span>
          </div>
        </div>

        <!-- Users Table -->
        <div v-else class="overflow-x-auto">
          <table class="w-full divide-y divide-gray-200 bg-white">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                  @click="sort('id')">
                  No.
                  <UIcon v-if="sortKey === 'id'" :name="sortAsc ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
                    class="inline-block ml-1 text-xs" />
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                  @click="sort('id')">
                  ID
                  <UIcon v-if="sortKey === 'id'" :name="sortAsc ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
                    class="inline-block ml-1 text-xs" />
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                  @click="sort('firstName')">
                  Name
                  <UIcon v-if="sortKey === 'firstName'" :name="sortAsc ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
                    class="inline-block ml-1 text-xs" />
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                  @click="sort('email')">
                  Email
                  <UIcon v-if="sortKey === 'email'" :name="sortAsc ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
                    class="inline-block ml-1 text-xs" />
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                  @click="sort('role')">
                  Role
                  <UIcon v-if="sortKey === 'role'" :name="sortAsc ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
                    class="inline-block ml-1 text-xs" />
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(user, i) in displayedUsers" :key="user.id">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {{ i + 1 }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.id }}</td>
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
                    <UButton variant="ghost" class="cp" size="sm" icon="i-lucide-eye" @click="viewUser(user)" />
                    <UButton variant="ghost" class="cp" size="sm" icon="i-lucide-edit" @click="openEdit(user)" />
                    <UButton variant="ghost" class="cp" size="sm" icon="i-lucide-trash" @click="deleteUser(user)" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Empty State -->
          <div v-if="displayedUsers.length === 0" class="text-center py-12">
            <UIcon name="i-lucide-users" class="text-gray-400 text-4xl mb-4" />
            <h3 class="text-lg font-medium text-gray-900 mb-2">No users found</h3>
            <p class="text-gray-500">Try adjusting your search or sort.</p>
          </div>
        </div>

        <!-- Edit User Modal -->
        <div v-if="showEdit"
          class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div class="bg-darkblue text-white px-6 py-4 flex justify-between items-center">
              <h3 class="text-xl font-semibold">Edit User Profile</h3>
              <button @click="closeEdit" class="text-white text-2xl">
                <UIcon name="i-lucide-x" />
              </button>
            </div>
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
          </div>
        </div>
        <!-- End Edit Modal -->
      </div>
    </main>
  </div>
</template>

<script setup>
import AppSidebar from '@/components/AppSidebar.vue'
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const users = ref([])
const loading = ref(false)
const error = ref('')
const searchQuery = ref('')
const sortKey = ref('')
const sortAsc = ref(true)

const showEdit = ref(false)
const editForm = ref({
  id: null,
  firstName: '',
  lastName: '',
  email: '',
  role: '',
  phone: '',
  address: ''
})

function getToken() {
  return localStorage.getItem('token') || ''
}

function getRoleColor(role) {
  const colors = {
    admin: 'bg-green-100 text-green-800',
    user: 'bg-blue-100 text-blue-800'
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

function viewUser(u) {
  router.push(`/users/${u.id}`)
}

async function openEdit(u) {
  showEdit.value = true
  try {
    const res = await $fetch(`/users/${u.id}`, {
      baseURL: 'http://localhost:3000',
      headers: { Authorization: `Bearer ${getToken()}` }
    })
    const udata = res.data
    editForm.value = {
      id: udata.id,
      firstName: udata.firstName,
      lastName: udata.lastName,
      email: udata.email,
      role: udata.role,
      phone: udata.phone,
      address: udata.address
    }
  } catch (e) {
    error.value = e.data?.message || e.message
  }
}

function closeEdit() {
  showEdit.value = false
}

async function submitEdit() {
  const { id, firstName, lastName, email, role, phone, address } = editForm.value
  try {
    await $fetch(`/users/${id}`, {
      method: 'PUT',
      baseURL: 'http://localhost:3000',
      headers: { Authorization: `Bearer ${getToken()}` },
      body: { fName: firstName, lName: lastName, email, role, phone, address }
    })
    await fetchUsers()
    closeEdit()
  } catch (e) {
    error.value = e.data?.message || e.message
  }
}

async function deleteUser(u) {
  if (!confirm(`Delete ${u.firstName} ${u.lastName}?`)) return
  try {
    await $fetch(`/users/${u.id}`, {
      method: 'DELETE',
      baseURL: 'http://localhost:3000',
      headers: { Authorization: `Bearer ${getToken()}` }
    })
    await fetchUsers()
  } catch (e) {
    error.value = e.data?.message || e.message
  }
}

// Sort function
function sort(key) {
  if (sortKey.value === key) {
    sortAsc.value = !sortAsc.value
  } else {
    sortKey.value = key
    sortAsc.value = true
  }
}

// Filtered & sorted list
const displayedUsers = computed(() => {
  let list = users.value.slice()
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(u =>
      (`${u.firstName} ${u.lastName}`).toLowerCase().includes(q)
    )
  }
  if (sortKey.value) {
    list.sort((a, b) => {
      let va = a[sortKey.value] ?? ''
      let vb = b[sortKey.value] ?? ''
      if (typeof va === 'string') va = va.toLowerCase()
      if (typeof vb === 'string') vb = vb.toLowerCase()
      if (va < vb) return sortAsc.value ? -1 : 1
      if (va > vb) return sortAsc.value ? 1 : -1
      return 0
    })
  }
  return list
})

onMounted(fetchUsers)
</script>
