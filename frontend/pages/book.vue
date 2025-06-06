<template>
    <div class="flex min-h-screen bg-gray-50">
      <AppSidebar />
  
      <main class="flex-1 p-4 sm:p-6 lg:p-8">
        <!-- Header -->
        <div class="mb-6 px-2 sm:px-0">
          <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 ms-10">Book Management</h1>
          <p class="text-gray-600 mt-1 text-sm sm:text-base ms-10">
            Browse and manage all books in the library
          </p>
        </div>
  
        <!-- Search & Filter -->
        <div class="mb-6 px-2 sm:px-0">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4">
            <div class="w-full sm:w-1/2 lg:w-1/3">
              <div class="relative">
                <UIcon
                  name="i-lucide-search"
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search by name..."
                  class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 text-gray-700 bg-white text-sm"
                />
              </div>
            </div>
            <div class="w-full sm:w-1/3 lg:w-1/4">
              <select
                v-model.number="category"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-white text-gray-700 text-sm"
              >
                <option :value="0">All Categories</option>
                <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                  {{ cat.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
  
        <!-- Books Grid -->
        <div
          v-if="displayedBooks.length > 0"
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 px-2 sm:px-0"
        >
          <router-link
            v-for="book in displayedBooks"
            :key="book.id"
            :to="`/books/${book.id}`"
            class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-200 group"
          >
            <!-- Book Cover -->
            <div class="aspect-[3/4] bg-gray-100 flex items-center justify-center relative">
              <img
                v-if="book.photo"
                :src="book.photo"
                :alt="book.name"
                class="w-full h-full object-cover"
                loading="lazy"
              />
              <div v-else class="flex flex-col items-center text-gray-400">
                <UIcon name="i-lucide-book-open" class="text-2xl mb-1" />
                <p class="text-xs text-gray-500">No Image</p>
              </div>
              <span
                class="absolute top-2 right-2 inline-flex px-2 text-[10px] font-medium py-0.5 rounded-full"
                :class="book.availableCopies > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
              >
                {{ book.availableCopies > 0 ? 'Available' : 'Out' }}
              </span>
            </div>
  
            <!-- Book Info -->
            <div class="p-2">
              <h3
                class="font-semibold text-gray-900 text-sm line-clamp-1 mb-1"
                :title="book.name"
              >
                {{ book.name }}
              </h3>
              <p
                class="text-[10px] sm:text-xs text-gray-500 line-clamp-1 mb-1"
                :title="book.author"
              >
                {{ book.author }}
              </p>
              <div class="flex flex-wrap gap-1">
                <span
                  v-for="catItem in book.categories || []"
                  :key="catItem.id ?? catItem.categoryId"
                  class="px-1.5 py-0.5 bg-blue-100 text-blue-800 text-[8px] font-medium rounded-full"
                >
                  {{ findCategoryName(catItem.categoryId) }}
                </span>
                <span
                  v-if="!book.categories || book.categories.length === 0"
                  class="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[8px] font-medium rounded-full"
                >
                  Uncategorized
                </span>
              </div>
            </div>
          </router-link>
        </div>
  
        <!-- Empty State -->
        <div v-else class="text-center py-12 px-2 sm:px-0">
          <UIcon name="i-lucide-book" class="text-gray-400 text-4xl sm:text-5xl mb-3" />
          <h3 class="text-sm sm:text-base font-medium text-gray-900 mb-2">No books found</h3>
          <p class="text-gray-500 text-xs sm:text-sm">Add your first book to the library.</p>
        </div>
      </main>
    </div>
  </template>  
  
  <script setup>
  import { ref, onMounted, computed } from 'vue'
  import AppSidebar from '@/components/AppSidebar.vue'
  
  const books = ref([])
  const categories = ref([])
  const searchQuery = ref('')
  const category = ref(0)
  
  function getToken() {
    return localStorage.getItem('token') || ''
  }
  
  async function fetchBooks() {
    try {
      const res = await $fetch('/books', {
        baseURL: 'http://localhost:3000',
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      books.value = res.data
    } catch {
      books.value = []
    }
  }
  
  async function fetchCategories() {
    try {
      const res = await $fetch('/category', {
        baseURL: 'http://localhost:3000',
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      categories.value = res.data
    } catch {
      categories.value = []
    }
  }
  
  function findCategoryName(catId) {
    const found = categories.value.find((c) => c.id === catId)
    return found ? found.name : ''
  }
  
  const displayedBooks = computed(() => {
    let filtered = books.value
    if (searchQuery.value) {
      const qLower = searchQuery.value.toLowerCase()
      filtered = filtered.filter((b) =>
        b.name.toLowerCase().includes(qLower)
      )
    }
    if (category.value !== 0) {
      filtered = filtered.filter((book) => {
        return (
          Array.isArray(book.categories) &&
          book.categories.some((cItem) => cItem.categoryId === category.value)
        )
      })
    }
    return filtered
  })
  
  onMounted(async () => {
    await fetchCategories()
    await fetchBooks()
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
  