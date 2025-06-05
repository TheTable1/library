<template>
    <div class="flex min-h-screen">
      <!-- Sidebar -->
      <AppSidebar />
  
      <!-- Content -->
      <main class="flex-1 bg-gray-50 p-6">
        <div class="w-full bg-white shadow-sm rounded-lg p-6">
          <!-- Header + Toolbar -->
          <div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 class="text-3xl font-bold text-gray-900">Category Management</h1>
            </div>
            <div class="mt-4 sm:mt-0 flex space-x-2">
              <!-- Search -->
              <div class="relative mt-5">
                <UIcon name="i-lucide-search" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-darkblue" />
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search by category..."
                  class="pl-10 pr-4 py-2 border rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-200 border-gray-300 text-darkblue"
                />
              </div>
              <!-- Add Category Button -->
              <UButton @click="openCreate" variant="primary" class="px-4 py-2 flex items-center space-x-2 cp bg-darkblue mt-5">
                <UIcon name="i-lucide-plus-circle" />
                <span>Add Category</span>
              </UButton>
            </div>
          </div>
  
          <!-- Loading -->
          <div v-if="loading" class="flex items-center justify-center py-12">
            <div class="flex items-center space-x-2 text-gray-600">
              <UIcon name="i-lucide-loader-2" class="animate-spin" />
              <span>Loading categories...</span>
            </div>
          </div>
  
          <!-- Error -->
          <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div class="flex items-center space-x-2 text-red-700">
              <UIcon name="i-lucide-alert-circle" />
              <span>{{ error }}</span>
            </div>
          </div>
  
          <!-- Category Table -->
          <div v-else class="overflow-x-auto">
            <table class="min-w-max w-full table-auto divide-y divide-gray-200 bg-white shadow rounded-lg">
              <thead class="bg-gray-50">
                <tr>
                  <th class="w-12 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">No.</th>
                  <th
                    @click="sort('id')"
                    class="w-15 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                  >
                    ID
                    <UIcon
                      v-if="sortKey === 'id'"
                      :name="sortAsc ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
                      class="inline-block ml-1 text-xs"
                    />
                  </th>
                  <th
                    @click="sort('name')"
                    class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer whitespace-nowrap"
                  >
                    Category
                    <UIcon
                      v-if="sortKey === 'name'"
                      :name="sortAsc ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
                      class="inline-block ml-1 text-xs"
                    />
                  </th>
                  <th class="w-35 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">Detail</th>
                  <th class="w-24 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="(cat, i) in displayedCategories" :key="cat.id">
                  <td class="px-3 py-2 text-sm text-gray-900 whitespace-nowrap">{{ i + 1 }}</td>
                  <td class="px-3 py-2 text-sm text-gray-900 whitespace-nowrap">{{ cat.id }}</td>
                  <td class="px-3 py-2 text-sm text-gray-900 whitespace-nowrap">{{ cat.name }}</td>
                  <td class="px-3 py-2 text-sm text-gray-900 whitespace-nowrap">{{ cat.detail || '-' }}</td>
                  <td class="px-3 py-2 text-sm whitespace-nowrap">
                    <div class="flex items-center space-x-2">
                      <UButton
                        variant="ghost"
                        class="cp"
                        size="sm"
                        icon="i-lucide-edit"
                        @click="openEdit(cat)"
                      />
                      <UButton
                        variant="ghost"
                        class="cp"
                        size="sm"
                        icon="i-lucide-trash"
                        @click="deleteCategory(cat)"
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
  
            <!-- Empty State -->
            <div v-if="displayedCategories.length === 0" class="text-center py-12">
              <UIcon name="i-lucide-tag" class="text-gray-400 text-4xl mb-4" />
              <h3 class="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
              <p class="text-gray-500">Try adjusting search or add a new category.</p>
            </div>
          </div>
        </div>
      </main>
  
      <!-- Create/Edit Modal -->
      <div
        v-if="showEdit"
        class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      >
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
          <!-- Header -->
          <div class="bg-darkblue text-white px-6 py-4 flex justify-between items-center">
            <h3 class="text-xl font-semibold">
              {{ editForm.id ? 'Edit Category' : 'Add New Category' }}
            </h3>
            <button @click="closeEdit" class="text-white text-2xl cp">
              <UIcon name="i-lucide-x" />
            </button>
          </div>
  
          <!-- Body -->
          <div class="p-6 text-black max-h-[80vh] overflow-y-auto">
            <form @submit.prevent="submitEdit" class="space-y-5">
              <!-- Name -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                <input
                  v-model="editForm.name"
                  type="text"
                  class="w-full border rounded-lg px-4 py-2"
                  required
                />
              </div>
  
              <!-- Detail -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Detail</label>
                <textarea
                  v-model="editForm.detail"
                  rows="3"
                  class="w-full border rounded-lg px-4 py-2 resize-none"
                ></textarea>
              </div>
  
              <!-- Actions -->
              <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button type="button" @click="closeEdit" class="px-4 py-2 border rounded-lg cp">
                  Cancel
                </button>
                <button type="submit" class="px-4 py-2 bg-darkblue text-white rounded-lg cp">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import AppSidebar from '@/components/AppSidebar.vue'
  import { ref, onMounted, computed } from 'vue'
  import { useRouter } from 'vue-router'
  
  const categories = ref([])
  const loading = ref(false)
  const error = ref('')
  const searchQuery = ref('')
  const sortKey = ref('')
  const sortAsc = ref(true)
  
  const showEdit = ref(false)
  const editForm = ref({
    id: null,
    name: '',
    detail: ''
  })
  
  const router = useRouter()
  
  function getToken() {
    return localStorage.getItem('token') || ''
  }
  
  async function fetchCategories() {
    loading.value = true
    error.value = ''
    try {
      const res = await $fetch('/category', {
        baseURL: 'http://localhost:3000',
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      categories.value = res.data
    } catch (e) {
      error.value = e.data?.message || e.message || 'Failed to load categories'
      categories.value = []
    } finally {
      loading.value = false
    }
  }
  
  function openEdit(cat) {
    editForm.value = {
      id: cat.id,
      name: cat.name || '',
      detail: cat.detail || ''
    }
    showEdit.value = true
  }
  
  function openCreate() {
    editForm.value = { id: null, name: '', detail: '' }
    showEdit.value = true
  }
  
  function closeEdit() {
    showEdit.value = false
  }
  
  async function submitEdit() {
    const { id, ...data } = editForm.value
    try {
      if (id) {
        await $fetch(`/category/${id}`, {
          method: 'PUT',
          baseURL: 'http://localhost:3000',
          headers: {
            Authorization: `Bearer ${getToken()}`,
            'Content-Type': 'application/json'
          },
          body: data
        })
      } else {
        await $fetch('/category', {
          method: 'POST',
          baseURL: 'http://localhost:3000',
          headers: {
            Authorization: `Bearer ${getToken()}`,
            'Content-Type': 'application/json'
          },
          body: data
        })
      }
      await fetchCategories()
      closeEdit()
    } catch (e) {
      error.value = e.data?.message || e.message
    }
  }
  
  async function deleteCategory(cat) {
    if (!confirm(`Delete category "${cat.name}"?`)) return
    try {
      await $fetch(`/category/${cat.id}`, {
        method: 'DELETE',
        baseURL: 'http://localhost:3000',
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      await fetchCategories()
    } catch (e) {
      error.value = e.data?.message || e.message
    }
  }

  function sort(key) {
    if (sortKey.value === key) {
      sortAsc.value = !sortAsc.value
    } else {
      sortKey.value = key
      sortAsc.value = true
    }
  }

  const displayedCategories = computed(() => {
    let list = categories.value.slice()

    if (searchQuery.value) {
      const q = searchQuery.value.toLowerCase()
      list = list.filter(cat => cat.name.toLowerCase().includes(q))
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
  
  onMounted(() => {
    fetchCategories()
  })
  </script>
  
  <style scoped>
  .line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  </style>
  