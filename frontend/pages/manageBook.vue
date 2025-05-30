<!-- pages/books.vue -->
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
            <h1 class="text-3xl font-bold text-gray-900">Book Management</h1>
            <p class="text-gray-600 mt-1">Browse and manage all books in the library</p>
          </div>
          <div class="mt-4 sm:mt-0">
            <div class="relative mt-4">
              <UIcon name="i-lucide-search" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-darkblue" />
              <input v-model="searchQuery" type="text" placeholder="Search by title..."
                class="pl-10 pr-4 py-2 border rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-200 border-gray-300 text-darkblue" />
            </div>
          </div>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="flex items-center justify-center py-12">
          <div class="flex items-center space-x-2 text-gray-600">
            <UIcon name="i-lucide-loader-2" class="animate-spin" />
            <span>Loading books...</span>
          </div>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div class="flex items-center space-x-2 text-red-700">
            <UIcon name="i-lucide-alert-circle" />
            <span>{{ error }}</span>
          </div>
        </div>

        <!-- Table -->
        <div v-else class="overflow-x-auto">
          <table class="table-fixed w-full divide-y divide-gray-200 bg-white shadow rounded-lg">
            <thead class="bg-gray-50">
              <tr>
                <th class="w-12 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  No.
                </th>
                <th class="w-15 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                  @click="sort('id')">
                  ID
                  <UIcon v-if="sortKey === 'id'" :name="sortAsc ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
                    class="inline-block ml-1 text-xs" />
                </th>
                <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                  @click="sort('name')">
                  Title
                  <UIcon v-if="sortKey === 'name'" :name="sortAsc ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
                    class="inline-block ml-1 text-xs" />
                </th>
                <th class="w-40 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                  @click="sort('author')">
                  Author
                  <UIcon v-if="sortKey === 'author'" :name="sortAsc ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
                    class="inline-block ml-1 text-xs" />
                </th>
                <th class="w-35 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">ISBN</th>
                <th class="w-15 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th class="w-15 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Avail.</th>
                <th class="w-24 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                  @click="sort('price')">
                  Price
                  <UIcon v-if="sortKey === 'price'" :name="sortAsc ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
                    class="inline-block ml-1 text-xs" />
                </th>
                <th class="w-32 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(book, i) in displayedBooks" :key="book.id">
                <td class="px-3 py-2 text-sm text-gray-900">{{ i + 1 }}</td>
                <td class="px-3 py-2 text-sm text-gray-900">{{ book.id }}</td>
                <td class="px-3 py-2 text-sm text-gray-900">{{ book.name }}</td>
                <td class="px-3 py-2 text-sm text-gray-900">{{ book.author }}</td>
                <td class="px-3 py-2 text-sm text-gray-900">{{ book.isbn }}</td>
                <td class="px-3 py-2 text-sm text-gray-900">{{ book.totalCopies }}</td>
                <td class="px-3 py-2 text-sm text-gray-900">{{ book.availableCopies }}</td>
                <td class="px-3 py-2 text-sm font-medium text-green-600">${{ book.price }}</td>
                <td class="px-3 py-2 text-sm">
                  <div class="flex items-center space-x-2">
                    <UButton variant="ghost" class="cp" size="sm" icon="i-lucide-eye" @click="viewBook(book)" />
                    <UButton variant="ghost" class="cp" size="sm" icon="i-lucide-edit" @click="openEdit(book)" />
                    <UButton variant="ghost" class="cp" size="sm" icon="i-lucide-trash" @click="deleteBook(book)" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Empty State -->
          <div v-if="displayedBooks.length === 0" class="text-center py-12">
            <UIcon name="i-lucide-book" class="text-gray-400 text-4xl mb-4" />
            <h3 class="text-lg font-medium text-gray-900 mb-2">No books found</h3>
            <p class="text-gray-500">Try adjusting your search or sort.</p>
          </div>
        </div>
      </div>
    </main>

    <!-- Edit Book Modal -->
    <div v-if="showEdit" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div class="bg-darkblue text-white px-6 py-4 flex justify-between items-center">
          <h3 class="text-xl font-semibold">Edit Book</h3>
          <button @click="closeEdit" class="text-white text-2xl cp">
            <UIcon name="i-lucide-x" />
          </button>
        </div>
        <div class="p-6 text-black">
          <form @submit.prevent="submitEdit" class="space-y-5">
            <div class="grid grid-cols-2 gap-4 ">
              <div>
                <label class="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <svg class="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M4 3a1 1 0 000 2h12a1 1 0 100-2H4zM3 8a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm1 5a1 1 0 100 2h6a1 1 0 100-2H4z" />
                  </svg>
                  Title
                </label>
                <input v-model="editForm.name" type="text" class="w-full border rounded-lg px-4 py-2" />
              </div>
              <div>
                <label class="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <svg class="w-4 h-4 mr-2 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clip-rule="evenodd" />
                  </svg>
                  Author
                </label>
                <input v-model="editForm.author" type="text" class="w-full border rounded-lg px-4 py-2" />
              </div>
            </div>

            <div>
              <label class="flex items-center text-sm font-medium text-gray-700 mb-1">
                <svg class="w-4 h-4 mr-2 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
                ISBN
              </label>
              <input v-model="editForm.isbn" type="text" class="w-full border rounded-lg px-4 py-2" />
            </div>

            <div class="grid grid-cols-3 gap-4">
              <div>
                <label class="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <svg class="w-4 h-4 mr-2 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fill-rule="evenodd"
                      d="M4 5a2 2 0 012-2v1a1 1 0 001 1h6a1 1 0 001-1V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm2.5 5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z"
                      clip-rule="evenodd" />
                  </svg>
                  Total Copies
                </label>
                <input v-model.number="editForm.totalCopies" type="number" class="w-full border rounded-lg px-4 py-2" />
              </div>
              <div>
                <label class="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <svg class="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd" />
                  </svg>
                  Available
                </label>
                <input v-model.number="editForm.availableCopies" type="number"
                  class="w-full border rounded-lg px-4 py-2" />
              </div>
              <div>
                <label class="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <svg class="w-4 h-4 mr-2 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                      clip-rule="evenodd" />
                  </svg>
                  Pages
                </label>
                <input v-model.number="editForm.page" type="number" class="w-full border rounded-lg px-4 py-2" />
              </div>
            </div>

            <div>
              <label class="flex items-center text-sm font-medium text-gray-700 mb-1">
                <svg class="w-4 h-4 mr-2 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                    clip-rule="evenodd" />
                </svg>
                Price
              </label>
              <input v-model.number="editForm.price" type="number" step="0.01"
                class="w-full border rounded-lg px-4 py-2" />
            </div>

            <div>
              <label class="flex items-center text-sm font-medium text-gray-700 mb-1">
                <svg class="w-4 h-4 mr-2 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z"
                    clip-rule="evenodd" />
                </svg>
                Description
              </label>
              <textarea v-model="editForm.detail" rows="3"
                class="w-full border rounded-lg px-4 py-2 resize-none"></textarea>
            </div>

            <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button type="button" @click="closeEdit" class="flex items-center px-4 py-2 border rounded-lg cp">
                <svg class="w-4 h-4 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
                </svg>
                Cancel
              </button>
              <button type="submit" class="flex items-center px-4 py-2 bg-darkblue text-white rounded-lg cp">
                <svg class="w-4 h-4 mr-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd" />
                </svg>
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- End Edit Modal -->
  </div>
</template>

<script setup>
import AppSidebar from '@/components/AppSidebar.vue'
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const books = ref([])
const loading = ref(false)
const error = ref('')
const searchQuery = ref('')
const sortKey = ref('')
const sortAsc = ref(true)

const showEdit = ref(false)
const editForm = ref({
  id: null,
  name: '',
  author: '',
  isbn: '',
  totalCopies: 0,
  availableCopies: 0,
  page: 0,
  price: 0.0,
  detail: ''
})

const router = useRouter()

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

function viewBook(b) {
  router.push(`/books/${b.id}`)
}

function openEdit(b) {
  editForm.value = {
    id: b.id,
    name: b.name || '',
    author: b.author || '',
    isbn: b.isbn || '',
    totalCopies: b.totalCopies,
    availableCopies: b.availableCopies,
    page: b.page,
    price: b.price,
    detail: b.detail || ''
  }
  showEdit.value = true
}

function closeEdit() {
  showEdit.value = false
}

async function submitEdit() {
  const { id, ...all } = editForm.value
  const payload = {}
  Object.entries(all).forEach(([k, v]) => {
    if (v !== null) payload[k] = v
  })
  try {
    await $fetch(`/books/${id}`, {
      method: 'PUT',
      baseURL: 'http://localhost:3000',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      },
      body: payload
    })
    await fetchBooks()
    closeEdit()
  } catch (e) {
    error.value = e.data?.message || e.message
  }
}

async function deleteBook(b) {
  if (!confirm(`Delete "${b.name}"?`)) return
  try {
    await $fetch(`/books/${b.id}`, {
      method: 'DELETE',
      baseURL: 'http://localhost:3000',
      headers: { Authorization: `Bearer ${getToken()}` }
    })
    await fetchBooks()
  } catch (e) {
    error.value = e.data?.message || e.message
  }
}

// sort by column
function sort(key) {
  if (sortKey.value === key) {
    sortAsc.value = !sortAsc.value
  } else {
    sortKey.value = key
    sortAsc.value = true
  }
}

// computed list with search + sort
const displayedBooks = computed(() => {
  let list = books.value.slice()
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(b => b.name.toLowerCase().includes(q))
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

onMounted(fetchBooks)
</script>
