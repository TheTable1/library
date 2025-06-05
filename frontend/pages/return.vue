<template>
    <div class="flex min-h-screen bg-gray-50">
        <!-- Sidebar -->
        <AppSidebar />

        <!-- Main Content -->
        <main class="flex-1 p-6">
            <div class="bg-white shadow-lg rounded-lg p-6 max-w-7xl mx-auto">
                <!-- Header -->
                <h1 class="text-2xl font-bold text-gray-800">Loan Lists</h1>
                <div class="mb-6 flex items-center justify-between">
                    <div class="flex mt-3">
                        <h2 @click="setStatusFilter('borrowed')" :class="['cp me-5 ',
                            statusFilter === 'borrowed'
                                ? 'text-darkblue font-semibold border-b-2 border-darkblue'
                                : 'text-gray-600'
                        ]">
                            Borrowed
                        </h2>
                        <h2 @click="setStatusFilter('returned')" :class="['cp',
                            statusFilter === 'returned'
                                ? 'text-darkblue font-semibold border-b-2 border-darkblue'
                                : 'text-gray-600'
                        ]">
                            Returned
                        </h2>
                    </div>

                </div>

                <!-- Loading State -->
                <div v-if="loading" class="flex items-center justify-center py-12">
                    <div class="flex items-center space-x-2 text-gray-600">
                        <UIcon name="i-lucide-loader-2" class="animate-spin text-4xl text-gray-500" />
                        <span class="text-lg">Loading loan lists...</span>
                    </div>
                </div>

                <!-- Error State -->
                <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <div class="flex items-center space-x-2 text-red-700">
                        <UIcon name="i-lucide-alert-circle" class="text-xl" />
                        <span>{{ error }}</span>
                    </div>
                </div>

                <!-- Loan Lists Table -->
                <div v-else class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200 bg-white rounded-lg shadow">
                        <thead class="bg-gray-50">
                            <tr >
                                <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">No.</th>
                                <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Loan Date
                                </th>
                                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Due Date
                                </th>
                                <th v-if="statusFilter === 'returned'" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Return Date
                                </th>
                                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">fine
                                </th>
                                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Books</th>
                                <th class="px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="(list, i) in filteredLists" :key="list.id">
                                <td class="px-3 py-2 text-sm text-gray-900">{{ i + 1 }}</td>
                                <td class="px-3 py-2 text-sm text-gray-900">{{ list.id }}</td>
                                <td class="px-4 py-2 text-sm text-gray-900">
                                    {{ list.user.firstName }} {{ list.user.lastName }}<br />
                                    <span class="text-xs text-gray-500">{{ list.user.email }}</span>
                                </td>
                                <td class="px-4 py-2 text-sm text-gray-900">
                                    {{ formatDate(list.loanDate) }}
                                </td>
                                <td class="px-4 py-2 text-sm text-gray-900">
                                    {{ formatDate(list.dueDate) }}
                                </td>
                                <td v-if="list.status === 'returned'" class="px-4 py-2 text-sm text-gray-900">
                                    {{ formatDate(list.returnedDate) }}
                                </td>
                                <td class="px-4 py-2 text-sm text-gray-900">
                                    {{list.fine}}
                                </td>
                                <td class="px-4 py-2 text-sm">
                                    <span :class="[
                                        list.status === 'borrowed' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800',
                                        'inline-flex px-2 py-1 text-xs font-semibold rounded-full'
                                    ]">
                                        {{ list.status === 'borrowed' ? 'Borrowed' : 'Returned' }}
                                    </span>
                                </td>
                                <td class="px-4 py-2 text-sm text-gray-900">
                                    <ul class="list-disc list-inside">
                                        <li v-for="book in list.books" :key="book.id">
                                            {{ book.name }}
                                        </li>
                                    </ul>
                                </td>
                                <td class="px-6 py-2 text-sm font-medium space-x-2">
                                    <!-- Edit Button -->
                                    <UButton v-if="list.status === 'borrowed'" variant="ghost" size="sm" icon="i-lucide-edit" @click="editList(list)" />
                                    <!-- Delete Button -->
                                    <UButton v-if="list.status === 'borrowed'" variant="ghost" size="sm" icon="i-lucide-trash-2"
                                        @click="deleteList(list)" />
                                    <!-- Confirm Return Button (only if still borrowed) -->
                                    <UButton v-if="list.status === 'borrowed'" variant="ghost" size="sm"
                                        icon="i-lucide-log-out" @click="confirmReturn(list)" />
                                </td>
                            </tr>
                            <tr v-if="lists.length === 0">
                                <td colspan="7" class="px-6 py-12 text-center text-gray-500">
                                    No loan records found.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import AppSidebar from '@/components/AppSidebar.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Borrow from './borrow.vue'

const lists = ref([])
const loading = ref(false)
const error = ref('')
const router = useRouter()
const statusFilter = ref("borrowed");

function setStatusFilter(st) {
    statusFilter.value = st;
}

const filteredLists = computed(() => {
    return lists.value.filter((list) => list.status === statusFilter.value);
});

function formatDate(dateString) {
    const d = new Date(dateString)
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}

async function fetchLists() {
    loading.value = true
    error.value = ''
    try {
        const res = await $fetch('/lists', {
            baseURL: 'http://localhost:3000',
            headers: { Authorization: `Bearer ${localStorage.getItem('token') || ''}` }
        })
        lists.value = res.data
    } catch (e) {
        error.value = e.data?.message || e.message || 'Failed to load loan lists'
    } finally {
        loading.value = false
    }
}

function editList(list) {
    router.push(`/lists/${list.id}/edit`)
}

async function deleteList(list) {
    if (!confirm(`Are you sure you want to delete loan #${list.id}?`)) return
    try {
        await $fetch(`/lists/${list.id}`, {
            method: 'DELETE',
            baseURL: 'http://localhost:3000',
            headers: { Authorization: `Bearer ${localStorage.getItem('token') || ''}` }
        })
        await fetchLists()
    } catch (e) {
        alert(e.data?.message || e.message || 'Delete failed')
    }
}

async function confirmReturn(list) {
    const ok = confirm(`Mark loan #${list.id} as returned?`)
    if (!ok) return
    try {
        const today = new Date().toISOString().split('T')[0]
        await $fetch(`/lists/${list.id}/return`, {
            method: 'PUT',
            baseURL: 'http://localhost:3000',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
                'Content-Type': 'application/json'
            },
            body: { returnedDate: new Date().toISOString() }
        })
        await fetchLists()
    } catch (e) {
        alert(e.data?.message || e.message || 'Return failed')
    }
}

onMounted(fetchLists)
</script>