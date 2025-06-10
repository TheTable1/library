<template>
  <div>
    <!-- Toggle sidebar button -->
    <button
      class="fixed top-4 left-4 z-50 bg-white/90 rounded-lg shadow-lg p-2 pb-1 cp"
      @click="toggleSidebar"
    >
      <UIcon
        :name="'i-lucide-menu'"
        class="text-gray-700 text-xl"
      />
    </button>

    <!-- Sidebar: slide in/out -->
    <aside
      :class="[
        'flex flex-col bg-gray-900 text-white h-screen w-64 fixed top-0 left-0 z-40 transform transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <!-- Logo / Brand -->
      <router-link to="/login" class="block mt-12">
        <div class="p-6 border-b border-gray-700 flex items-center space-x-3">
          <div class="bg-blue-600 p-2 rounded-lg">
            <UIcon name="i-lucide-layout-dashboard" class="text-white text-xl" />
          </div>
          <div>
            <h1 class="text-xl font-bold">Sanbrary</h1>
            <p class="text-gray-400 text-sm">Library System</p>
          </div>
        </div>
      </router-link>

      <!-- Navigation Menu -->
      <nav class="flex-1 px-2 py-6 overflow-y-auto">
        <!-- Main Menu -->
        <div class="mb-6">
          <h2 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
            Main Menu
          </h2>
          <ul class="space-y-1">
            <li>
              <router-link
                to="/book"
                :class="[
                  'flex items-center py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 pl-3 pr-2',
                  isActive('/book')
                    ? 'bg-white text-darkblue'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                ]"
              >
                <UIcon name="i-lucide-book-text" class="text-lg mr-3 flex-shrink-0" />
                <span>Book</span>
              </router-link>
            </li>
            <li>
              <router-link
                to="/favorite"
                :class="[
                  'flex items-center py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 pl-3 pr-2',
                  isActive('/favorite')
                    ? 'bg-white text-darkblue'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                ]"
              >
                <UIcon name="i-lucide-heart" class="text-lg mr-3 flex-shrink-0" />
                <span>Favorite</span>
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Admin Section -->
        <div v-if="role === 'admin'" class="mb-6">
          <h2 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
            Admin
          </h2>
          <ul class="space-y-1">
            <li>
              <router-link
                to="/user"
                :class="[
                  'flex items-center py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 pl-3 pr-2',
                  isActive('/user')
                    ? 'bg-white text-darkblue'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                ]"
              >
                <UIcon name="i-lucide-users" class="text-lg mr-3 flex-shrink-0" />
                <span>User</span>
              </router-link>
            </li>
            <li>
              <router-link
                to="/manageBook"
                :class="[
                  'flex items-center py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 pl-3 pr-2',
                  isActive('/manageBook')
                    ? 'bg-white text-darkblue'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                ]"
              >
                <UIcon name="i-lucide-book-open" class="text-lg mr-3 flex-shrink-0" />
                <span>Manage Book</span>
              </router-link>
            </li>
            <li>
              <router-link
                to="/category"
                :class="[
                  'flex items-center py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 pl-3 pr-2',
                  isActive('/category')
                    ? 'bg-white text-darkblue'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                ]"
              >
                <UIcon
                  name="i-lucide-chart-column-stacked"
                  class="text-lg mr-3 flex-shrink-0"
                />
                <span>Category</span>
              </router-link>
            </li>
            <li>
              <button
                @click="toggleSettings"
                class="w-full flex items-center py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 hover:bg-gray-800 text-gray-300 hover:text-white px-3"
              >
                <UIcon name="i-lucide-settings" class="text-lg mr-3 flex-shrink-0" />
                <span class="flex-1 text-left">Management</span>
                <UIcon
                  name="i-lucide-chevron-down"
                  class="text-sm transition-transform"
                  :class="showSettings ? 'rotate-180' : ''"
                />
              </button>
              <div v-show="showSettings" class="mt-1 ml-6 space-y-1">
                <router-link
                  to="/borrow"
                  class="flex items-center px-3 py-2 text-sm text-gray-400 rounded-lg hover:bg-gray-800 hover:text-white transition-colors duration-200"
                >
                  <UIcon name="i-lucide-book-plus" class="mr-3 text-base" />
                  Borrowing
                </router-link>
                <router-link
                  to="/return"
                  class="flex items-center px-3 py-2 text-sm text-gray-400 rounded-lg hover:bg-gray-800 hover:text-white transition-colors duration-200"
                >
                  <UIcon name="i-lucide-book-up-2" class="mr-3 text-base" />
                  Returning
                </router-link>
              </div>
            </li>
          </ul>
        </div>
      </nav>

      <!-- Bottom: User Profile Preview (ติดก้น sidebar) -->
      <div @click="goProfile" class="p-4 border-t border-gray-700 cursor-pointer">
        <div class="flex items-center space-x-3">
          <div
            class="h-8 w-8 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center"
          >
            <img
              v-if="photo"
              :src="photo"
              alt="User avatar"
              class="h-full w-full object-cover"
            />
            <UIcon v-else name="i-lucide-user" class="text-white text-sm" />
          </div>
          <div>
            <p class="text-sm font-medium text-white truncate">{{ fullName }}</p>
            <p class="text-xs text-gray-400 truncate">{{ email }}</p>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const isOpen = ref(false)
const showSettings = ref(false)
const role = ref('')
const id = ref(null)
const fullName = ref('')
const email = ref('')
const photo = ref('')

const activePath = computed(() => route.path)

function toggleSidebar() {
  isOpen.value = !isOpen.value
}
function toggleSettings() {
  showSettings.value = !showSettings.value
}
function goProfile() {
  if (id.value) router.push('/profile')
}
function isActive(prefix) {
  return activePath.value.startsWith(prefix)
}

async function fetchUser() {
  try {
    const res = await $fetch('/users/me', {
      baseURL: 'http://localhost:3000',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    const u = res.data
    id.value = u.id
    fullName.value = `${u.fName || u.firstName} ${u.lName || u.lastName}`
    email.value = u.email
    role.value = u.role
    photo.value = u.photo || ''
  } catch (e) {
    console.error('Load user fail:', e)
  }
}

onMounted(fetchUser)
</script>

<style scoped>
/* ไม่ต้องเพิ่ม CSS อะไรเพิ่มเติม */
</style>
