<template>
    <div class="flex min-h-screen bg-gray-100">
      <!-- Sidebar -->
      <AppSidebar />
  
      <!-- Main Content -->
      <main class="flex-1 p-6 lg:p-10">
        <div class="max-w-4xl mx-auto space-y-10">
          <!-- Loading State -->
          <div
            v-if="loading"
            class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-12 text-center border border-gray-200"
          >
            <div class="relative w-16 h-16 mx-auto mb-6">
              <div class="absolute inset-0 border-4 border-blue-100 rounded-full animate-pulse"></div>
              <div class="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p class="text-gray-600 text-lg font-medium">Loading user details...</p>
          </div>
  
          <!-- Error State -->
          <div
            v-else-if="error"
            class="bg-white rounded-2xl shadow-lg p-8 border border-red-200 flex items-center space-x-4"
          >
            <div class="flex-shrink-0 w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
              <UIcon name="i-lucide-alert-circle" class="text-red-500 text-2xl" />
            </div>
            <div>
              <h3 class="text-red-700 font-semibold text-lg">An Error Occurred</h3>
              <p class="text-red-500 mt-1">{{ error }}</p>
            </div>
          </div>
  
          <!-- User Detail -->
          <div v-else-if="user" class="space-y-10 animate-fade-in">
            <!-- Header -->
            <div class="bg-darkblue rounded-3xl shadow-xl overflow-hidden">
              <div class="p-8 lg:p-12">
                <div
                  class="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8"
                >
                  <!-- Avatar -->
                  <div class="relative group flex-shrink-0">
                    <div
                      @click="openPhotoModal"
                      class="cursor-pointer w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center overflow-hidden border-4 border-white/20 transition-transform duration-300 group-hover:scale-105"
                    >
                      <img
                        v-if="user.photo"
                        :src="user.photo"
                        alt="User photo"
                        class="object-cover w-full h-full"
                      />
                      <UIcon
                        v-else
                        name="i-lucide-user"
                        class="text-white/60 text-5xl md:text-6xl"
                      />
                    </div>
                  </div>
                  <!-- Info -->
                  <div class="flex-1 text-center lg:text-left">
                    <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 lg:mb-3 drop-shadow-lg">
                      {{ user.firstName }} {{ user.lastName }}
                    </h1>
                    <div class="flex flex-wrap justify-center lg:justify-start gap-2 md:gap-4">
                      <span
                        class="flex items-center px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold bg-white/20 text-white border border-white/30 backdrop-blur-sm"
                        :class="getRoleGradient(user.role)"
                      >
                        <UIcon
                          name="i-lucide-shield-check"
                          class="mr-1 md:mr-2 text-white text-xs md:text-sm"
                        />
                        {{ user.role }}
                      </span>
                      <span
                        class="text-white/80 text-xs md:text-sm font-medium bg-white/10 px-3 py-1 md:px-4 md:py-2 rounded-full backdrop-blur-sm"
                      >
                        User ID: {{ user.id }}
                      </span>
                    </div>
                  </div>
                  <!-- Actions -->
                  <div class="flex mt-3 sm:flex-row items-center sm:items-start gap-3">
                    <button
                      @click="openEditProfile"
                      class="px-3 py-2 bg-white/50 rounded-xl text-xs md:text-sm font-medium hover:bg-white/70 transition"
                    >
                    Change Password
                    </button>
                    <router-link
                      :to="`/profileDetail/${user.id}`"
                      class="px-3 py-2 bg-white/50 rounded-xl text-xs md:text-sm font-medium hover:bg-white/70 transition"
                    >
                      My List
                    </router-link>
                    <button
                      @click="handleLogOut"
                      class="px-3 py-2 bg-white/50 rounded-xl text-xs md:text-sm font-medium hover:bg-white/70 transition"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Contact & Account Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <!-- Contact -->
              <div class="bg-white rounded-3xl shadow-md p-6">
                <h2 class="text-xl font-semibold text-gray-800 mb-4">Contact Information</h2>
                <div class="h-1 w-16 bg-gradient-to-r from-blue-500 to-transparent mb-6"></div>
                <div class="space-y-6">
                  <div class="flex items-center space-x-4">
                    <div class="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full">
                      <UIcon name="i-lucide-mail" class="text-blue-600 text-xl" />
                    </div>
                    <div>
                      <p class="text-xs text-gray-500">Email</p>
                      <p class="text-gray-800 font-medium">{{ user.email }}</p>
                    </div>
                  </div>
                  <div class="flex items-center space-x-4">
                    <div class="w-10 h-10 flex items-center justify-center bg-emerald-100 rounded-full">
                      <UIcon name="i-lucide-phone" class="text-emerald-600 text-xl" />
                    </div>
                    <div>
                      <p class="text-xs text-gray-500">Phone Number</p>
                      <p class="text-gray-800 font-medium">{{ user.phone || 'Not specified' }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Account -->
              <div class="bg-white rounded-3xl shadow-md p-6">
                <h2 class="text-xl font-semibold text-gray-800 mb-4">Account Information</h2>
                <div class="h-1 w-16 bg-gradient-to-r from-purple-500 to-transparent mb-6"></div>
                <div class="space-y-6">
                  <div class="flex items-center space-x-4">
                    <div class="w-10 h-10 flex items-center justify-center bg-purple-100 rounded-full">
                      <UIcon name="i-lucide-shield-check" class="text-purple-600 text-xl" />
                    </div>
                    <div>
                      <p class="text-xs text-gray-500">Role</p>
                      <p class="text-gray-800 font-medium capitalize">{{ user.role }}</p>
                    </div>
                  </div>
                  <div class="flex items-center space-x-4">
                    <div class="w-10 h-10 flex items-center justify-center bg-indigo-100 rounded-full">
                      <UIcon name="i-lucide-calendar" class="text-indigo-600 text-xl" />
                    </div>
                    <div>
                      <p class="text-xs text-gray-500">Member for</p>
                      <p class="text-gray-800 font-medium">{{ getDaysAsMember(user.memberSince) }} days</p>
                      <p class="text-xs text-gray-500">Member since {{ user.memberSince }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Address -->
            <div class="bg-white rounded-3xl shadow-md p-6">
              <h2 class="text-xl font-semibold text-gray-800 mb-4">Address</h2>
              <div class="h-1 w-16 bg-gradient-to-r from-emerald-500 to-transparent mb-6"></div>
              <div class="flex items-start space-x-4">
                <div class="w-10 h-10 flex items-center justify-center bg-emerald-100 rounded-full mt-1">
                  <UIcon name="i-lucide-map-pin" class="text-emerald-600 text-xl" />
                </div>
                <div>
                  <p class="text-gray-800 font-medium leading-relaxed">
                    {{ user.address || 'No address specified' }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
  
      <!-- Photo Modal -->
      <div
        v-if="showPhotoModal"
        class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      >
        <div class="bg-white rounded-2xl shadow-xl w-full max-w-md">
          <div class="bg-darkblue text-white px-6 py-4 flex justify-between items-center rounded-t-2xl">
            <h3 class="text-xl font-semibold">Change Photo</h3>
            <button @click="closePhotoModal" class="text-white text-2xl">
              <UIcon name="i-lucide-x" />
            </button>
          </div>
          <div class="p-6">
            <form @submit.prevent="submitPhoto" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
                <input
                  v-model="photoForm.photo"
                  type="url"
                  placeholder="https://example.com/your-image.jpg"
                  class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  required
                />
              </div>
              <div class="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  @click="closePhotoModal"
                  class="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="px-5 py-2 bg-darkblue text-white rounded-lg hover:bg-indigo-700"
                >
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  
      <!-- Password Modal -->
      <div
        v-if="showEditProfile"
        class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      >
        <div class="bg-white rounded-2xl shadow-xl w-full max-w-md">
          <div class="bg-darkblue text-white px-6 py-4 flex justify-between items-center rounded-t-2xl">
            <h3 class="text-xl font-semibold">Edit Profile</h3>
            <button @click="closeEditProfile" class="text-white text-2xl">
              <UIcon name="i-lucide-x" />
            </button>
          </div>
          <div class="p-6">
            <form @submit.prevent="submitEditProfile" class="space-y-4">
              <!-- New Password -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input
                  v-model="editForm.password"
                  type="password"
                  placeholder="New Password"
                  class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>
              <!-- Confirm Password -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Confirm Password</label
                >
                <input
                  v-model="editForm.confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
                <p v-if="confirmError" class="mt-1 text-red-500 text-xs">{{ confirmError }}</p>
              </div>
              <!-- Actions -->
              <div class="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  @click="closeEditProfile"
                  class="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="px-5 py-2 bg-darkblue text-white rounded-lg hover:bg-indigo-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import AppSidebar from '@/components/AppSidebar.vue'
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  
  const user = ref(null)
  const loading = ref(false)
  const error = ref('')
  const showPhotoModal = ref(false)
  const photoForm = ref({ photo: '' })
  const showEditProfile = ref(false)
  const editForm = ref({ id: null, password: '', confirmPassword: '' })
  const confirmError = ref('')
  
  const router = useRouter()
  
  function getToken() {
    return localStorage.getItem('token') || ''
  }

  function isTokenExpired(token) {
    try {
      const base64 = token.split('.')[1]
      const { exp } = JSON.parse(atob(base64))
      return Date.now() >= exp * 1000
    } catch {
      return true
    }
  }

  function getRoleGradient(role) {
    const grads = {
      admin: 'bg-gradient-to-r from-red-500/20 to-orange-500/20 border-red-300/50',
      user: 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-300/50'
    }
    return grads[role.toLowerCase()] || 'bg-gradient-to-r from-gray-500/20 to-slate-500/20 border-gray-300/50'
  }
  function getDaysAsMember(text) {
    if (!text) return 0
    try {
      const months = {
        'มกราคม':0,'กุมภาพันธ์':1,'มีนาคม':2,'เมษายน':3,'พฤษภาคม':4,'มิถุนายน':5,
        'กรกฎาคม':6,'สิงหาคม':7,'กันยายน':8,'ตุลาคม':9,'พฤศจิกายน':10,'ธันวาคม':11
      }
      const [d,m,y] = text.split(' ')
      const date = new Date(y-543, months[m], +d)
      return Math.ceil((Date.now() - date)/864e5)
    } catch {
      return 0
    }
  }
  
  async function fetchUser() {
    loading.value = true
    error.value = ''
    const token = getToken()
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem('token')
      return router.push('/login')
    }
    try {
      const res = await $fetch('/users/me', {
        baseURL: 'http://localhost:3000',
        headers: { Authorization: `Bearer ${token}` }
      })
      user.value = res.data
    } catch (e) {
      error.value = e.data?.message || e.message || 'Unable to load user data'
    } finally {
      loading.value = false
    }
  }
  
  function handleLogOut() {
    localStorage.removeItem('token')
    router.push('/login')
  }
  
  function openPhotoModal() {
    photoForm.value.photo = user.value?.photo || ''
    showPhotoModal.value = true
  }

  function closePhotoModal() {
    showPhotoModal.value = false
  }

  async function submitPhoto() {
    const token = getToken()
    if (!token) return router.push('/login')
    try {
      await $fetch(`/users/${user.value.id}`, {
        method: 'PUT',
        baseURL: 'http://localhost:3000',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: { photo: photoForm.value.photo }
      })
      await fetchUser()
      closePhotoModal()
    } catch (e) {
      error.value = e.data?.message || e.message || 'Failed to update photo'
    }
  }
  
  function openEditProfile() {
    if (!user.value) return
    editForm.value = { id: user.value.id, password: '', confirmPassword: '' }
    confirmError.value = ''
    showEditProfile.value = true
  }

  function closeEditProfile() {
    showEditProfile.value = false
    confirmError.value = ''
  }

  async function submitEditProfile() {
    confirmError.value = ''
    if (editForm.value.password && editForm.value.password !== editForm.value.confirmPassword) {
      confirmError.value = 'Passwords do not match'
      return
    }
    const token = getToken()
    if (!token) return router.push('/login')
    const payload = {}
    if (editForm.value.password) payload.password = editForm.value.password
    try {
      await $fetch(`/users/${editForm.value.id}`, {
        method: 'PUT',
        baseURL: 'http://localhost:3000',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: payload
      })
      await fetchUser()
      closeEditProfile()
    } catch (e) {
      error.value = e.data?.message || e.message || 'Failed to update profile'
    }
  }
  
  onMounted(fetchUser)
  </script>
  