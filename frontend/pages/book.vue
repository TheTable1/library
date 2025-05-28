<!-- pages/books.vue -->
<template>
    <div class="flex min-h-screen">
        <!-- Sidebar Component -->
        <AppSidebar />

        <!-- Content -->
        <main class="flex-1 bg-gray-50 p-4 sm:p-6">
            <!-- หัวเรื่อง -->
            <div class="mb-4 sm:mb-6">
                <h1 class="text-xl sm:text-2xl font-bold text-gray-900">Book Management</h1>
                <p class="text-gray-600 mt-1 text-xs sm:text-sm">
                    Browse and manage all books in the library
                </p>
            </div>

            <!-- Loading / Error ตามเดิม… -->

            <!-- Grid: 5 columns แน่นอน -->
            <div v-if="books.length > 0" class="w-full grid grid-cols-5 gap-2">
                <div v-for="book in books" :key="book.id"
                    class="bg-white rounded-md shadow-sm hover:shadow-md transition duration-200 overflow-hidden border border-gray-200">
                    <!-- ภาพหนังสือ -->
                    <div
                        class="aspect-[2/3] bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center relative">
                        <img v-if="book.photo" :src="book.photo" :alt="book.name" class="w-full h-full object-cover"
                            loading="lazy" />
                        <div v-else class="text-center">
                            <UIcon name="i-lucide-book-open" class="text-lg text-gray-400 mb-1" />
                            <p class="text-[10px] text-gray-500">No Image</p>
                        </div>
                        <span class="absolute top-1 right-1 inline-flex px-1 py-0.5 rounded text-[10px] font-medium"
                            :class="book.availableCopies > 0
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'">
                            {{ book.availableCopies > 0 ? 'Available' : 'Out' }}
                        </span>
                    </div>

                    <!-- ข้อมูลหนังสือ -->
                    <div class="p-2">
                        <h3 class="font-medium text-gray-900 text-sm line-clamp-1 mb-1" :title="book.name">{{ book.name
                            }}</h3>
                        <p class="text-xs text-gray-500 line-clamp-1 mb-1" :title="book.author">{{ book.author }}</p>
                        <div class="flex flex-wrap gap-1 mb-1">
                            <span v-for="cat in book.categories" :key="cat.id"
                                class="inline-flex px-1 py-0.5 text-[9px] font-medium bg-blue-100 text-blue-800 rounded">
                                {{ cat.name }}
                            </span>
                            <span v-if="book.categories.length === 0"
                                class="inline-flex px-1 py-0.5 text-[9px] font-medium bg-gray-100 text-gray-600 rounded">
                                Uncategorized
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Empty State -->
            <div v-else class="text-center py-6">
                <UIcon name="i-lucide-book" class="text-gray-400 text-3xl sm:text-5xl mb-2" />
                <h3 class="text-sm sm:text-base font-medium text-gray-900 mb-1">No books found</h3>
                <p class="text-gray-500 text-xs sm:text-sm">Add your first book to the library.</p>
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AppSidebar from '@/components/AppSidebar.vue'

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

onMounted(fetchBooks)
</script>

<style scoped>
.line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>