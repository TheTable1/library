<template>
    <div class="flex min-h-screen bg-gray-50">
      <!-- Sidebar -->
      <AppSidebar />
  
      <!-- Main Content -->
      <main class="flex-1 p-6">
        <div class="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
          <!-- Header -->
          <div class="mb-6">
            <h1 class="text-2xl font-bold text-gray-800">Edit Loan</h1>
            <p class="text-gray-600 mt-1">Modify user, due date, or selected books</p>
          </div>
  
          <!-- Form -->
          <form @submit.prevent="onSubmit" class="space-y-6">
            <!-- User ID + Due Date -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label for="userId" class="block text-sm font-medium text-gray-700 mb-1">User ID</label>
                <input
                  v-model.number="form.userId"
                  type="number"
                  id="userId"
                  placeholder="Enter user ID"
                  required
                  class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 text-gray-700"
                />
              </div>
              <div>
                <label for="dueDate" class="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                <input
                  v-model="form.dueDate"
                  type="date"
                  id="dueDate"
                  required
                  class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 text-gray-700"
                />
              </div>
            </div>
  
            <!-- Search Box -->
            <div class="relative w-full max-w-md">
              <UIcon name="i-lucide-search" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search books..."
                class="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 text-gray-700"
              />
            </div>
  
            <!-- Books Table -->
            <div class="overflow-x-auto">
              <table class="min-w-full bg-white divide-y divide-gray-200 rounded-lg shadow-sm">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="w-10 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Select</th>
                    <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                    <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Author</th>
                    <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Available</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="book in filteredBooks" :key="book.id">
                    <td class="px-3 py-2">
                      <label class="inline-flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        :value="book.id"
                        v-model="form.bookIds"
                        class="sr-only"
                      />
                      <div class="relative">
                        <div class="w-6 h-6 border-2 rounded-md transition-all duration-300 ease-in-out group-hover:shadow-sm flex items-center justify-center"
                             :class="form.bookIds.includes(book.id) 
                               ? 'bg-darkblue shadow-md' 
                               : 'bg-white border-gray-300 group-hover:border-indigo-400'">
                          <!-- Checkmark Icon - Always present but conditionally visible -->
                          <svg class="w-4 h-4 transition-all duration-200"
                               :class="form.bookIds.includes(book.id) ? 'text-white scale-100' : 'text-transparent scale-0'"
                               fill="none" 
                               stroke="currentColor" 
                               viewBox="0 0 24 24"
                               stroke-width="3">
                            <path stroke-linecap="round" 
                                  stroke-linejoin="round" 
                                  d="M5 13l4 4L19 7">
                            </path>
                          </svg>
                        </div>
                      </div>
                    </label>
                    </td>
                    
                    <td class="px-4 py-2 text-sm text-gray-800">{{ book.name }}</td>
                    <td class="px-4 py-2 text-sm text-gray-800">{{ book.author }}</td>
                    <td class="px-4 py-2 text-sm text-gray-800">{{ book.availableCopies }}</td>
                  </tr>
                  <tr v-if="filteredBooks.length === 0">
                    <td colspan="4" class="px-4 py-6 text-center text-gray-500">
                      No books found or no copies available
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
  
            <!-- Error Message -->
            <div v-if="error" class="text-red-500 text-sm">{{ error }}</div>
  
            <!-- Submit Button -->
            <div class="flex justify-end">
              <button
                type="submit"
                :disabled="loading"
                class="flex items-center gap-2 bg-darkblue text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-800 transition disabled:opacity-50"
              >
                <UIcon name="i-lucide-save" class="text-lg" />
                <span v-if="!loading">Update</span>
              </button>
            </div>
          </form>
        </div>
  
        <!-- Success Popup -->
        <div
          v-if="showSuccess"
          class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <div class="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 text-center space-y-4">
            <UIcon name="i-lucide-check-circle" class="text-5xl text-green-500 mx-auto" />
            <h2 class="text-xl font-semibold text-gray-800">Loan updated successfully!</h2>
            <button
              @click="closeSuccess"
              class="mt-4 bg-green-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              OK
            </button>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  import AppSidebar from '@/components/AppSidebar.vue'
  import { ref, computed, onMounted } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  
  const router = useRouter()
  const route = useRoute()
  const lists = ref([])
  const books = ref([])
  const loading = ref(false)
  const error = ref('')
  const searchQuery = ref('')
  
  const form = ref({
    userId: null,
    dueDate: '',
    bookIds: []
  })
  
  const showSuccess = ref(false)
  const listId = Number(route.params.id)
  
  // ดึงหนังสือทั้งหมด เมื่อ mount
  async function fetchBooks() {
    loading.value = true
    error.value = ''
    try {
      const res = await $fetch('/books', {
        baseURL: 'http://localhost:3000',
        headers: { Authorization: `Bearer ${localStorage.getItem('token') || ''}` }
      })
      // เก็บหนังสือที่มีสำเนาเหลือ หรือถ้ามีในรายการเดิมให้แสดงด้วย
      books.value = res.data
    } catch (e) {
      error.value = e.data?.message || e.message || 'Failed to load books'
    } finally {
      loading.value = false
    }
  }
  
  // ดึงข้อมูล list เดิม แล้วเติมลงใน form
  async function fetchList() {
    loading.value = true
    error.value = ''
    try {
      const res = await $fetch(`/lists/${listId}`, {
        baseURL: 'http://localhost:3000',
        headers: { Authorization: `Bearer ${localStorage.getItem('token') || ''}` }
      })
      const data = res.data
      form.value.userId = data.user.id
      // แปลง dueDate ให้อยู่ในฟอร์แมต yyyy-MM-dd
      form.value.dueDate = new Date(data.dueDate).toISOString().split('T')[0]
      form.value.bookIds = data.books.map(b => b.id)
    } catch (e) {
      error.value = e.data?.message || e.message || 'Failed to load loan details'
    } finally {
      loading.value = false
    }
  }
  
  // กรองหนังสือตาม search และให้รวมหนังสือใน list เดิมด้วย
  const filteredBooks = computed(() => {
    const q = searchQuery.value.trim().toLowerCase()
    return books.value.filter(b => {
      const isSelected = form.value.bookIds.includes(b.id)
      const hasAvailable = b.availableCopies > 0
      const matchesSearch = !q || b.name.toLowerCase().includes(q)
      // แสดงเฉพาะหนังสือที่มี availableCopies > 0 หรือกำลังถูกเลือกใน list นี้
      return matchesSearch && (hasAvailable || isSelected)
    })
  })
  
  // ส่ง PATCH/PUT เพื่ออัปเดต list
  async function onSubmit() {
    if (!form.value.userId) {
      error.value = 'Please enter User ID'
      return
    }
    if (!form.value.dueDate) {
      error.value = 'Please select Due Date'
      return
    }
    if (form.value.bookIds.length === 0) {
      error.value = 'Please select at least one book'
      return
    }
  
    loading.value = true
    error.value = ''
    try {
      const payload = {
        userId: form.value.userId,
        dueDate: form.value.dueDate,
        bookIds: form.value.bookIds
      }
      await $fetch(`/lists/${listId}`, {
        method: 'PUT',
        baseURL: 'http://localhost:3000',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
          'Content-Type': 'application/json'
        },
        body: payload
      })
      showSuccess.value = true
    } catch (e) {
      error.value = e.data?.message || e.message || 'Update failed'
    } finally {
      loading.value = false
    }
  }
  
  function closeSuccess() {
    showSuccess.value = false
    router.push('/return')
  }
  
  onMounted(() => {
    fetchBooks()
    fetchList()
  })
  </script>