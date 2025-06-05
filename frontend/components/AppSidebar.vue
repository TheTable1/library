<!-- components/AppSidebar.vue -->
<template>
  <div class="relative flex">
    <!-- Sidebar -->
    <aside :class="[
      'sticky top-0 h-screen bg-gray-900 text-white overflow-y-auto overflow-x-hidden z-20',
      isCollapsed ? 'w-20' : 'w-64'
    ]">
      <div class="h-full flex flex-col">
        <!-- Toggle Button -->
        <div class="absolute right-0 top-6 z-30">
          <button @click="toggleSidebar"
            class="bg-gray-900 border border-gray-700 rounded-full p-1.5 hover:bg-gray-800 transition-colors duration-200">
            <UIcon :name="isCollapsed ? 'i-lucide-chevron-right' : 'i-lucide-chevron-left'"
              class="text-white text-sm" />
          </button>
        </div>

        <!-- Logo/Brand Section -->
        <router-link to="/login">
        <div class="p-6 border-b border-gray-700">
          <div :class="[
            'transition-all duration-200',
            isCollapsed ? 'flex justify-center' : 'flex items-center space-x-3'
          ]">
            <div class="bg-blue-600 p-2 rounded-lg flex-shrink-0">
              <UIcon name="i-lucide-layout-dashboard" class="text-white text-xl" />
            </div>
            <div v-show="!isCollapsed" class="transition-opacity duration-200">
              <h1 class="text-xl font-bold">Sanbrary</h1>
              <p class="text-gray-400 text-sm">Library System</p>
            </div>
          </div>
        </div>
      </router-link>

        <!-- Navigation Menu -->
        <nav class="flex-1 px-4 py-6 space-y-2">
          <!-- Main Navigation -->
          <div class="mb-6">
            <h2 v-show="!isCollapsed" class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
              Main Menu
            </h2>
            <ul class="space-y-1">
              <!-- Book -->
              <li>
                <a href="/book" :class="[
                  'flex items-center py-2.5 text-sm font-medium rounded-lg transition-colors duration-200',
                  isCollapsed ? 'justify-center' : 'pl-3 pr-2',
                  isActive('/book').value
                    ? 'bg-white text-darkblue'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                ]">
                  <UIcon name="i-lucide-book-text" class="text-lg flex-shrink-0" :class="isCollapsed ? '' : 'mr-3'" />
                  <span v-show="!isCollapsed">Book</span>
                </a>
              </li>


            </ul>
          </div>

          <!-- Admin Section -->
          <div v-if="role === 'admin'" class="mb-6">
            <h2 v-show="!isCollapsed" class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
              Admin
            </h2>
            <ul class="space-y-1">
              <li>
                <a href="/user" :class="[
                  'flex items-center py-2.5 text-sm font-medium rounded-lg transition-colors duration-200',
                  isCollapsed ? 'justify-center' : 'pl-3 pr-2',
                  isActive('/user').value
                    ? 'bg-white text-darkblue'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                ]">
                  <UIcon name="i-lucide-users" class="text-lg flex-shrink-0" :class="isCollapsed ? '' : 'mr-3'" />
                  <span v-show="!isCollapsed">User </span>
                </a>
              </li>
              <li>
                <a href="/manageBook" :class="[
                  'flex items-center py-2.5 text-sm font-medium rounded-lg transition-colors duration-200',
                  isCollapsed ? 'justify-center' : 'pl-3 pr-2',
                  isActive('/manageBook').value
                    ? 'bg-white text-darkblue'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                ]">
                  <UIcon name="i-lucide-book-open" class="text-lg flex-shrink-0" :class="isCollapsed ? '' : 'mr-3'" />
                  <span v-show="!isCollapsed">Book </span>
                </a>
              </li>
              <li>
                <div class="relative">
                  <button @click="toggleSettings" :class="[
                    'w-full flex items-center py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 hover:bg-gray-800 text-gray-300 hover:text-white',
                    isCollapsed ? 'justify-center px-0' : 'px-3'
                  ]">
                    <div class="flex items-center">
                      <UIcon name="i-lucide-settings" class="text-lg flex-shrink-0"
                        :class="isCollapsed ? '' : 'mr-3'" />
                      <span v-show="!isCollapsed">Management</span>
                    </div>
                    <UIcon v-show="!isCollapsed" name="i-lucide-chevron-down"
                      class="text-sm transition-transform duration-200 ps-8"
                      :class="showSettings ? 'rotate-180' : ''" />
                  </button>
                  <div v-show="showSettings && !isCollapsed" class="mt-1 ml-6 space-y-1">
                    <a href="/borrow"
                      class="flex items-center px-3 py-2 text-sm text-gray-400 rounded-lg hover:bg-gray-800 hover:text-white transition-colors duration-200">
                      <UIcon name="i-lucide-book-plus" class="mr-3 text-base" />
                      <span>Borrowing</span>
                    </a>
                    <a href="/return"
                      class="flex items-center px-3 py-2 text-sm text-gray-400 rounded-lg hover:bg-gray-800 hover:text-white transition-colors duration-200">
                      <UIcon name="i-lucide-book-up-2" class="mr-3 text-base" />
                      <span>Returning</span>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </nav>

        <!-- Bottom Section (User Profile) -->
        <div @click="goProfile" class="p-4 border-t border-gray-700 cursor-pointer">
          <div :class="[
            'transition-all duration-200',
            isCollapsed ? 'flex justify-center' : 'flex items-center space-x-3'
          ]">
            <div class="bg-blue-600 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0">
              <UIcon name="i-lucide-user" class="text-white text-sm" />
            </div>
            <div v-show="!isCollapsed" class="flex-1 min-w-0 transition-opacity duration-200">
              <p class="text-sm font-medium text-white truncate">{{ fullName }}</p>
              <p class="text-xs text-gray-400 truncate">{{ email }}</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUser } from '@/composables/useUser'

const router = useRouter()
const { id, fullName, email, role } = useUser()

const isCollapsed = ref(false)
const showSettings = ref(false)

function toggleSidebar() {
  isCollapsed.value = !isCollapsed.value
}
function toggleSettings() {
  showSettings.value = !showSettings.value
}

function goProfile() {
  if (id.value) {
    router.push(`/profile`)
  }
}

const activePath = computed(() => router.currentRoute.value.path)
const isActive = (prefix) => computed(() => activePath.value.startsWith(prefix))
</script>
