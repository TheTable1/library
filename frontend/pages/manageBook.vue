<!-- pages/books.vue -->
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
              <h1 class="text-3xl font-bold text-gray-900">Book Management</h1>
              <p class="text-gray-600 mt-2">Browse and manage all books in the library</p>
            </div>
  
            <!-- Loading State -->
            <div v-if="loading" class="flex items-center justify-center py-12">
              <div class="flex items-center space-x-2 text-gray-600">
                <UIcon name="i-lucide-loader-2" class="animate-spin" />
                <span>Loading books...</span>
              </div>
            </div>
  
            <!-- Error State -->
            <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
              <div class="flex items-center space-x-2 text-red-700">
                <UIcon name="i-lucide-alert-circle" />
                <span>{{ error }}</span>
              </div>
            </div>
  
            <!-- Books Table -->
            <div v-else class="overflow-x-auto">
              <table class="w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      No.
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Author
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ISBN
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Available
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="(book, i) in books" :key="book.id">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {{ i + 1 }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ book.id }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ book.name }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ book.author }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ book.isbn }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ book.totalCopies }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ book.availableCopies }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                      ${{ book.price }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div class="flex space-x-2">
                        <UButton
                          variant="ghost"
                          size="sm"
                          icon="i-lucide-eye"
                          @click="viewBook(book)"
                        />
                        <UButton
                          variant="ghost"
                          size="sm"
                          icon="i-lucide-edit"
                          @click="editBook(book)"
                        />
                        <UButton
                          variant="ghost"
                          size="sm"
                          icon="i-lucide-trash"
                          @click="deleteBook(book)"
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
  
              <!-- Empty State -->
              <div v-if="books.length === 0" class="text-center py-12">
                <UIcon name="i-lucide-book" class="text-gray-400 text-4xl mb-4" />
                <h3 class="text-lg font-medium text-gray-900 mb-2">No books found</h3>
                <p class="text-gray-500">Get started by adding your first book.</p>
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
  
  const books = ref([])
  const loading = ref(false)
  const error = ref('')
  
  function getToken() {
    return localStorage.getItem('token') || ''
  }
  
  async function fetchBooks() {
    loading.value = true
    error.value = ''
    try {
      const res = await $fetch('/books', {
        baseURL: 'http://localhost:3000',
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      books.value = res.data
    } catch (e) {
      error.value = e.data?.message || e.message || 'Failed to load books'
    } finally {
      loading.value = false
    }
  }
  
  function viewBook(book) {
    window.location.href = `/books/${book.id}`
  }
  
  function editBook(book) {
    window.location.href = `/books/${book.id}/edit`
  }
  
  async function deleteBook(book) {
    if (!confirm(`Are you sure you want to delete "${book.name}"?`)) return
    try {
      await $fetch(`/books/${book.id}`, {
        method: 'DELETE',
        baseURL: 'http://localhost:3000',
        headers: { Authorization: `Bearer ${getToken()}` }
      })
      await fetchBooks()
    } catch (e) {
      error.value = e.data?.message || e.message || 'Failed to delete book'
    }
  }
  
  onMounted(fetchBooks)
  </script>
  
  <style scoped>
  /* ปรับบรรทัด จำกัดชื่อให้สั้น */
  .line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  </style>
  