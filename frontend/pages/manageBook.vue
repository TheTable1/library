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
            <h1 class="text-3xl font-bold text-gray-900">Book Management</h1>
            <p class="text-gray-600 mt-1">Browse and manage all books in the library</p>
          </div>
          <div class="mt-4 sm:mt-0 flex space-x-2 ">
            <!-- Search -->
            <div class="relative mt-5">
              <UIcon name="i-lucide-search" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-darkblue" />
              <input v-model="searchQuery" type="text" placeholder="Search by title..."
                class="pl-10 pr-4 py-2 border rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-200 border-gray-300 text-darkblue" />
            </div>
            <!-- Add Book Button -->
            <UButton @click="openCreate" variant="primary" class="px-4 py-2 flex items-center space-x-2 cp bg-darkblue mt-5">
              <UIcon name="i-lucide-book-plus" />
              <span>Add Book</span>
            </UButton>
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
                <th class="w-12 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">No.</th>
                <th @click="sort('id')"
                  class="w-15 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer">
                  ID
                  <UIcon v-if="sortKey === 'id'" :name="sortAsc ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
                    class="inline-block ml-1 text-xs" />
                </th>
                <th @click="sort('name')"
                  class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer">
                  Title
                  <UIcon v-if="sortKey === 'name'" :name="sortAsc ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
                    class="inline-block ml-1 text-xs" />
                </th>
                <th @click="sort('author')"
                  class="w-40 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer">
                  Author
                  <UIcon v-if="sortKey === 'author'" :name="sortAsc ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
                    class="inline-block ml-1 text-xs" />
                </th>
                <th class="w-35 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">ISBN</th>
                <th class="w-15 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th class="w-15 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Avail.</th>
                <th @click="sort('price')"
                  class="w-24 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer">
                  Price
                  <UIcon v-if="sortKey === 'price'" :name="sortAsc ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
                    class="inline-block ml-1 text-xs" />
                </th>
                <th class="w-32 px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(b, i) in displayedBooks" :key="b.id">
                <td class="px-3 py-2 text-sm text-gray-900">{{ i + 1 }}</td>
                <td class="px-3 py-2 text-sm text-gray-900">{{ b.id }}</td>
                <td class="px-3 py-2 text-sm text-gray-900">{{ b.name }}</td>
                <td class="px-3 py-2 text-sm text-gray-900">{{ b.author }}</td>
                <td class="px-3 py-2 text-sm text-gray-900">{{ b.isbn }}</td>
                <td class="px-3 py-2 text-sm text-gray-900">{{ b.totalCopies }}</td>
                <td class="px-3 py-2 text-sm text-gray-900">{{ b.availableCopies }}</td>
                <td class="px-3 py-2 text-sm font-medium text-green-600">${{ b.price }}</td>
                <td class="px-3 py-2 text-sm">
                  <div class="flex items-center space-x-2">
                    <UButton variant="ghost" class="cp" size="sm" icon="i-lucide-eye" @click="viewBook(b)" />
                    <UButton variant="ghost" class="cp" size="sm" icon="i-lucide-edit" @click="openEdit(b)" />
                    <UButton variant="ghost" class="cp" size="sm" icon="i-lucide-trash" @click="deleteBook(b)" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Empty State -->
          <div v-if="displayedBooks.length === 0" class="text-center py-12">
            <UIcon name="i-lucide-book" class="text-gray-400 text-4xl mb-4" />
            <h3 class="text-lg font-medium text-gray-900 mb-2">No books found</h3>
            <p class="text-gray-500">Try adjusting search or add a new book.</p>
          </div>
        </div>
      </div>
    </main>

    <!-- Edit/Create Modal -->
    <div v-if="showEdit" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        <!-- Header -->
        <div class="bg-darkblue text-white px-6 py-4 flex justify-between items-center">
          <h3 class="text-xl font-semibold">
            {{ editForm.id ? 'Edit Book' : 'Add New Book' }}
          </h3>
          <button @click="closeEdit" class="text-white text-2xl cp">
            <UIcon name="i-lucide-x" />
          </button>
        </div>

        <!-- Body -->
        <div class="p-6 text-black max-h-[80vh] overflow-y-auto">
          <form @submit.prevent="submitEdit" class="space-y-5">
            <!-- Title / Author -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input v-model="editForm.name" type="text" class="w-full border rounded-lg px-4 py-2" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Author</label>
                <input v-model="editForm.author" type="text" class="w-full border rounded-lg px-4 py-2" />
              </div>
            </div>

            <!-- ISBN -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">ISBN</label>
              <input v-model="editForm.isbn" type="text" class="w-full border rounded-lg px-4 py-2" />
            </div>

            <!-- Copies / Page / Price -->
            <div class="grid grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Total Copies</label>
                <input v-model.number="editForm.totalCopies" type="number" class="w-full border rounded-lg px-4 py-2" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Available</label>
                <input v-model.number="editForm.availableCopies" type="number"
                  class="w-full border rounded-lg px-4 py-2" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Pages</label>
                <input v-model.number="editForm.page" type="number" class="w-full border rounded-lg px-4 py-2" />
              </div>
            </div>

            <!-- Price -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <input v-model.number="editForm.price" type="number" step="0.01"
                class="w-full border rounded-lg px-4 py-2" />
            </div>

            <!-- Photo URL -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
              <input v-model="editForm.photo" type="text" class="w-full border rounded-lg px-4 py-2" />
            </div>

            <!-- Description -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea v-model="editForm.detail" rows="3"
                class="w-full border rounded-lg px-4 py-2 resize-none"></textarea>
            </div>

            <!-- Categories -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Categories</label>
              <div class="grid grid-cols-2 gap-2">
                <label v-for="cat in allCategories" :key="cat.id"
                  class="inline-flex items-center px-3 py-1 border rounded-lg cursor-pointer">
                  <input type="checkbox" :value="cat.id" v-model="editForm.categoryIds" class="mr-2" />
                  {{ cat.name }}
                </label>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button type="button" @click="closeEdit" class="px-4 py-2 border rounded-lg cp">
                Cancel
              </button>
              <button type="submit" class="px-4 py-2 bg-darkblue text-white rounded-lg cp">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- End Modal -->
  </div>
</template>

<script setup>
import AppSidebar from '@/components/AppSidebar.vue'
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const books = ref([])
const allCategories = ref([])
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
  photo: '',
  detail: '',
  categoryIds: []
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

async function fetchCategories() {
  try {
    const res = await $fetch('/category', {
      baseURL: 'http://localhost:3000',
      headers: { Authorization: `Bearer ${getToken()}` }
    })
    allCategories.value = res.data
  } catch {
    // ignore
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
    photo: b.photo || '',
    detail: b.detail || '',
    categoryIds: b.categories.map(c => c.categoryId)
  }
  showEdit.value = true
}

function openCreate() {
  editForm.value = {
    id: null, name: '', author: '', isbn: '', totalCopies: 0,
    availableCopies: 0, page: 0, price: 0.0, photo: '',
    detail: '', categoryIds: []
  }
  showEdit.value = true
}

function closeEdit() {
  showEdit.value = false
}

async function submitEdit() {
  const { id, ...data } = editForm.value
  const payload = {
    ...data,
    categoryIds: data.categoryIds
  }
  try {
    if (id) {
      // update
      await $fetch(`/books/${id}`, {
        method: 'PUT',
        baseURL: 'http://localhost:3000',
        headers: {
          Authorization: `Bearer ${getToken()}`,
          'Content-Type': 'application/json'
        },
        body: payload
      })
    } else {
      // create
      await $fetch('/books', {
        method: 'POST',
        baseURL: 'http://localhost:3000',
        headers: {
          Authorization: `Bearer ${getToken()}`,
          'Content-Type': 'application/json'
        },
        body: payload
      })
    }
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

onMounted(() => {
  fetchBooks()
  fetchCategories()
})
</script>
