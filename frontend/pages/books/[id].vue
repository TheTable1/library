<template>
    <div class="flex min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <!-- Sidebar -->
        <AppSidebar />

        <!-- Content -->
        <main class="flex-1 p-6 pt-3">
            <!-- Loading State -->
            <div v-if="loading" class="flex items-center justify-center h-full ">
                <div class="flex flex-col items-center space-y-4 text-gray-600">
                    <div class="relative">
                        <UIcon name="i-lucide-loader-2" class="animate-spin text-4xl text-blue-500" />
                        <div class="absolute inset-0 bg-blue-100 rounded-full animate-pulse opacity-30"></div>
                    </div>
                    <span class="text-lg font-medium">Loading book details...</span>
                </div>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="max-w-2xl mx-auto">
                <div class="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-6 shadow-lg">
                    <div class="flex items-center space-x-3 text-red-700">
                        <div class="p-2 bg-red-100 rounded-full">
                            <UIcon name="i-lucide-alert-circle" class="text-xl" />
                        </div>
                        <div>
                            <h3 class="font-semibold">Oops! Something went wrong</h3>
                            <p class="text-sm">{{ error }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Book Detail -->
            <div v-else-if="book" class="max-w-6xl mx-auto pt-3">

                <!-- Main Card -->
                <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <!-- Hero Section -->
                    <div class="relative bg-darkblue p-8 text-white">
                        <div class="absolute inset-0 bg-black opacity-10"></div>
                        <div class="relative z-10">
                            <h1 class="text-2xl font-bold mb-2">{{ book.name }}</h1>
                            <p class="text-lg opacity-90">by {{ book.author }}</p>
                        </div>
                    </div>

                    <div class="lg:flex">
                        <!-- Book Image Section -->
                        <div
                            class="lg:w-2/5 bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-8">
                            <div class="relative group">
                                <img v-if="book.photo" :src="book.photo" :alt="book.name"
                                    class="object-cover w-80 h-96 rounded-xl shadow-2xl transition-transform duration-300 "
                                    loading="lazy" />
                                <div v-else
                                    class="w-80 h-96 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl shadow-2xl flex flex-col items-center justify-center text-gray-500">
                                    <UIcon name="i-lucide-book-open" class="text-8xl mb-4 opacity-50" />
                                    <p class="text-lg font-medium">No Image Available</p>
                                </div>
                                <!-- Floating badge for availability -->
                                <div class="absolute -top-3 -right-3">
                                    <div :class="book.availableCopies > 0
                                        ? 'bg-green-500 text-white'
                                        : 'bg-red-500 text-white'" class="px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                                        {{ book.availableCopies > 0 ? 'Available' : 'Out of Stock' }}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Details Section -->
                        <div class="lg:w-3/5 p-8">
                            <div class="space-y-6">
                                <!-- Quick Info Grid -->
                                <div class="grid grid-cols-2 gap-4">
                                    <div class="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                                        <div class="flex items-center space-x-2 text-gray-600 mb-1">
                                            <UIcon name="i-lucide-hash" class="text-lg" />
                                            <span class="text-sm font-medium">ISBN</span>
                                        </div>
                                        <p class="font-semibold text-gray-900">{{ book.isbn }}</p>
                                    </div>

                                    <div class="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                                        <div class="flex items-center space-x-2 text-gray-600 mb-1">
                                            <UIcon name="i-lucide-file-text" class="text-lg" />
                                            <span class="text-sm font-medium">Pages</span>
                                        </div>
                                        <p class="font-semibold text-gray-900">{{ book.page }} pages</p>
                                    </div>

                                    <div class="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                                        <div class="flex items-center space-x-2 text-gray-600 mb-1">
                                            <UIcon name="i-lucide-wallet" class="text-lg" />
                                            <span class="text-sm font-medium">Price</span>
                                        </div>
                                        <p class=" text-gray-900 ">{{ book.price }}</p>
                                    </div>

                                    <div class="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                                        <div class="flex items-center space-x-2 text-gray-600 mb-1">
                                            <UIcon name="i-lucide-copy" class="text-lg" />
                                            <span class="text-sm font-medium">Copies</span>
                                        </div>
                                        <p class="font-semibold ">
                                            <span class="font-bold text-xl" :class="book.availableCopies > 0 ? 'text-green-600' : 'text-red-600'">
                                                {{ book.availableCopies }}
                                            </span>
                                            <span class="text-gray-500 font-bold text-xl"> / {{ book.totalCopies }}</span>
                                        </p>
                                    </div>
                                </div>

                                <!-- Categories Section -->
                                <div class=" md:flex bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl py-3 px-5">
                                    <div class="flex items-center space-x-2 mb-3 md:mb-0">
                                        <UIcon name="i-lucide-tag" class="text-xl text-blue-600" />
                                        <h3 class="text-md font-semibold text-gray-900 ">Categories</h3>
                                    </div>
                                    <div class="flex flex-wrap gap-3 ps-3">
                                        <span v-for="cat in book.categories" :key="cat.id"
                                            class="inline-flex items-center px-2 py-1 bg-white text-blue-700 rounded-full text-sm font-medium shadow-sm transition-shadow ">
                                            {{ cat.name }}
                                        </span>
                                        <span v-if="book.categories.length === 0"
                                            class="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm">
                                            Uncategorized
                                        </span>
                                    </div>
                                </div>

                                <!-- Description Section -->
                                <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                                    <div class="flex items-center space-x-2 mb-4">
                                        <UIcon name="i-lucide-file-text" class="text-xl text-purple-600" />
                                        <h3 class="text-lg font-semibold text-gray-900">Description</h3>
                                    </div>
                                    <div class="prose prose-gray max-w-none">
                                        <p class="text-gray-700 leading-relaxed whitespace-pre-line">
                                            {{ book.detail || 'No description available for this book.' }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Fallback if no book -->
            <div v-else class="text-center py-20">
                <div class="max-w-md mx-auto">
                    <UIcon name="i-lucide-book-x" class="text-6xl text-gray-400 mx-auto mb-4" />
                    <h2 class="text-2xl font-semibold text-gray-900 mb-2">Book Not Found</h2>
                    <p class="text-gray-600">The book you're looking for doesn't exist or has been removed.</p>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AppSidebar from '@/components/AppSidebar.vue'

const route = useRoute()
const bookId = route.params.id
const book = ref(null)
const loading = ref(false)
const error = ref('')

function getToken() {
    return localStorage.getItem('token') || ''
}

async function fetchBook() {
    loading.value = true
    error.value = ''
    try {
        const res = await $fetch(`/books/${bookId}`, {
            baseURL: 'http://localhost:3000',
            headers: { Authorization: `Bearer ${getToken()}` }
        })
        book.value = res.data
    } catch (e) {
        error.value = e.data?.message || e.message || 'Failed to load book'
    } finally {
        loading.value = false
    }
}



onMounted(fetchBook)
</script>