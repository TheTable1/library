<!-- components/AppSidebar.vue -->
<template>
    <aside :class="sidebarClasses">
      <div class="h-full bg-gray-900 text-white w-full flex flex-col">
        <!-- Toggle Button -->
        <div class="absolute -right-3 top-6 z-10">
          <button @click="toggleSidebar"
                  class="bg-gray-900 border border-gray-700 rounded-full p-1.5 hover:bg-gray-800 transition-colors duration-200">
            <UIcon :name="isCollapsed ? 'i-lucide-chevron-right' : 'i-lucide-chevron-left'"
                   class="text-white text-sm" />
          </button>
        </div>
  
        <!-- Logo/Brand Section -->
        <div class="p-6 border-b border-gray-700">
          <div :class="['transition-all duration-200',
                         isCollapsed ? 'flex justify-center' : 'flex items-center space-x-3']">
            <div class="bg-blue-600 p-2 rounded-lg flex-shrink-0">
              <UIcon name="i-lucide-layout-dashboard" class="text-white text-xl" />
            </div>
            <div v-show="!isCollapsed" class="transition-opacity duration-200">
              <h1 class="text-xl font-bold">Admin Panel</h1>
              <p class="text-gray-400 text-sm">Management System</p>
            </div>
          </div>
        </div>
  
        <!-- Navigation Menu -->
        <nav class="flex-1 px-4 py-6 space-y-2">
          <!-- Main Navigation -->
          <div class="mb-6">
            <h2 
              v-show="!isCollapsed"
              class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3 transition-opacity duration-200"
            >
              Main Menu
            </h2>
            <ul class="space-y-1">
              <!-- Dashboard -->
              <li>
                <a
                  href="/dashboard"
                  :class="[
                    'flex items-center py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 hover:bg-gray-800 group text-gray-300 hover:text-white',
                    isCollapsed ? 'justify-center px-0' : 'pl-3 pr-2'
                  ]"
                  :title="isCollapsed ? 'Dashboard' : ''"
                >
                  <UIcon 
                    name="i-lucide-home" 
                    class="text-lg flex-shrink-0" 
                    :class="isCollapsed ? '' : 'mr-3'" 
                  />
                  <span v-show="!isCollapsed" class="transition-opacity duration-200">Dashboard</span>
                </a>
              </li>
              <!-- Users -->
              <li>
                <a
                  href="/users"
                  :class="[
                    'flex items-center py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 bg-blue-600 text-white',
                    isCollapsed ? 'justify-center px-0' : 'pl-3 pr-2'
                  ]"
                  :title="isCollapsed ? 'User Management' : ''"
                >
                  <UIcon 
                    name="i-lucide-users" 
                    class="text-lg flex-shrink-0" 
                    :class="isCollapsed ? '' : 'mr-3'" 
                  />
                  <span v-show="!isCollapsed" class="transition-opacity duration-200">User Management</span>
                </a>
              </li>
              <!-- Settings -->
              <li>
                <div class="relative">
                  <button
                    @click="toggleSettings"
                    :class="[
                      'w-full flex items-center py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 hover:bg-gray-800 group text-gray-300 hover:text-white',
                      isCollapsed ? 'justify-center px-0' : 'px-3'
                    ]"
                    :title="isCollapsed ? 'Settings' : ''"
                  >
                    <div class="flex items-center">
                      <UIcon 
                        name="i-lucide-settings" 
                        class="text-lg flex-shrink-0" 
                        :class="isCollapsed ? '' : 'mr-3'" 
                      />
                      <span v-show="!isCollapsed" class="transition-opacity duration-200">Settings</span>
                    </div>
                    <UIcon 
                      v-show="!isCollapsed"
                      name="i-lucide-chevron-down" 
                      class="text-sm transition-transform duration-200"
                      :class="showSettings ? 'rotate-180' : ''" 
                    />
                  </button>
                  <div v-show="showSettings && !isCollapsed" class="mt-1 ml-6 space-y-1">
                    <a 
                      href="/settings/profile"
                      class="flex items-center px-3 py-2 text-sm text-gray-400 rounded-lg hover:bg-gray-800 hover:text-white transition-colors duration-200"
                    >
                      <UIcon name="i-lucide-user" class="mr-3 text-base" />
                      <span>Profile</span>
                    </a>
                    <a 
                      href="/settings/account"
                      class="flex items-center px-3 py-2 text-sm text-gray-400 rounded-lg hover:bg-gray-800 hover:text-white transition-colors duration-200"
                    >
                      <UIcon name="i-lucide-user-cog" class="mr-3 text-base" />
                      <span>Account</span>
                    </a>
                    <a 
                      href="/settings/security"
                      class="flex items-center px-3 py-2 text-sm text-gray-400 rounded-lg hover:bg-gray-800 hover:text-white transition-colors duration-200"
                    >
                      <UIcon name="i-lucide-shield" class="mr-3 text-base" />
                      <span>Security</span>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
  
          <!-- Secondary Navigation (Tools) -->
          <div class="mb-6">
            <h2 
              v-show="!isCollapsed"
              class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3 transition-opacity duration-200"
            >
              Tools
            </h2>
            <ul class="space-y-1">
              <!-- Analytics -->
              <li>
                <a
                  href="/analytics"
                  :class="[
                    'flex items-center py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 hover:bg-gray-800 group text-gray-300 hover:text-white',
                    isCollapsed ? 'justify-center px-0' : 'pl-3 pr-2'
                  ]"
                  :title="isCollapsed ? 'Analytics' : ''"
                >
                  <UIcon 
                    name="i-lucide-bar-chart-3" 
                    class="text-lg flex-shrink-0" 
                    :class="isCollapsed ? '' : 'mr-3'" 
                  />
                  <span v-show="!isCollapsed" class="transition-opacity duration-200">Analytics</span>
                </a>
              </li>
              <!-- Reports -->
              <li>
                <a
                  href="/reports"
                  :class="[
                    'flex items-center py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 hover:bg-gray-800 group text-gray-300 hover:text-white',
                    isCollapsed ? 'justify-center px-0' : 'pl-3 pr-2'
                  ]"
                  :title="isCollapsed ? 'Reports' : ''"
                >
                  <UIcon 
                    name="i-lucide-file-text" 
                    class="text-lg flex-shrink-0" 
                    :class="isCollapsed ? '' : 'mr-3'" 
                  />
                  <span v-show="!isCollapsed" class="transition-opacity duration-200">Reports</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
  
        <!-- Bottom Section (User Profile) -->
        <div class="p-4 border-t border-gray-700">
          <div :class="['transition-all duration-200',
                         isCollapsed ? 'flex justify-center' : 'flex items-center space-x-3']">
            <div class="bg-blue-600 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0">
              <UIcon name="i-lucide-user" class="text-white text-sm" />
            </div>
            <div v-show="!isCollapsed" class="flex-1 min-w-0 transition-opacity duration-200">
              <p class="text-sm font-medium text-white truncate">{{ userFullName }}</p>
              <p class="text-xs text-gray-400 truncate">{{ userEmail }}</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  
  const isCollapsed = ref(false)
  const showSettings = ref(false)
  
  const sidebarClasses = computed(() => [
    'transition-all duration-300 ease-in-out relative',
    isCollapsed.value ? 'w-18' : 'w-64'
  ])
  
  function toggleSidebar() {
    isCollapsed.value = !isCollapsed.value
    if (isCollapsed.value) showSettings.value = false
  }
  function toggleSettings() {
    if (!isCollapsed.value) showSettings.value = !showSettings.value
  }
  
  // ค่า default
  const userFullName = ref('User')
  const userEmail     = ref('—')
  
  // ฟังก์ชันถอดรหัส JWT payload
  function parseJwt(token) {
    try {
      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const json = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      )
      return JSON.parse(json)
    } catch {
      return null
    }
  }
  
  onMounted(() => {
    if (typeof window === 'undefined') return
  
    const rawToken = localStorage.getItem('token')
    if (!rawToken) return
  
    const payload = parseJwt(rawToken)
    if (!payload) return
  
    // อาจหุ้มข้อมูล user ใน payload.user หรือ payload.data
    const data = payload.user || payload.data || payload
  
    // ดึงชื่อ
    const first = data.fName      || data.firstName || ''
    const last  = data.lName      || data.lastName  || ''
    if (first || last) {
      userFullName.value = `${first} ${last}`.trim()
    } else if (data.name) {
      userFullName.value = data.name
    }
  
    // ดึงอีเมล
    if (data.email) {
      userEmail.value = data.email
    }
  })
  </script>
  
  <style>
  /* ปรับแต่งเพิ่มเติมได้ที่นี่ */
  </style>
  