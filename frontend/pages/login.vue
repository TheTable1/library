<template>
    <div
      class="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style="background-image: url('/images/background.jpg')"
    >
      <!-- Overlay -->
      <div class="absolute inset-0 bg-gray-900/60"></div>
  
      <!-- Card -->
      <div class="relative bg-white/70 backdrop-blur-sm rounded-xl shadow-2xl p-10 max-w-md w-full">
        <!-- Back Button -->
        <NuxtLink
          to="/"
          class="absolute top-4 right-4 text-gray-700 p-2 rounded-full transition"
          aria-label="Go Home"
        >
          X
        </NuxtLink>
  
        <!-- Logo -->
        <div class="flex justify-center mb-6">
          <svg
            class="w-16 h-16 text-indigo-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M4 19H20V5H4V19ZM6 7H18V17H6V7ZM8 9H10V15H8V9ZM12 9H14V15H12V9Z"
            />
          </svg>
        </div>
  
        <!-- Title -->
        <h1 class="text-3xl font-extrabold text-center text-gray-800 mb-8">
          Login
        </h1>
  
        <!-- Form -->
        <form @submit.prevent="onSubmit" class="space-y-6">
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              v-model="email"
              type="email"
              id="email"
              required
              placeholder="Enter Your Email"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-indigo-400
                     transition"
            />
          </div>
  
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              v-model="password"
              type="password"
              id="password"
              required
              placeholder="Enter Your Password"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-indigo-400
                     transition"
            />
          </div>
  
          <div v-if="error" class="text-red-500 text-sm">{{ error }}</div>
  
          <button
            type="submit"
            :disabled="loading"
            class="w-full flex items-center justify-center gap-2
                   bg-indigo-600 hover:bg-indigo-700 text-white font-semibold
                   py-3 rounded-lg transition disabled:opacity-50"
          >
            <span v-if="!loading">Sign In</span>
          </button>
  
          <p class="text-sm text-gray-600 text-center">
            &copy; {{ new Date().getFullYear() }} Library System
          </p>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const email = ref('')
  const password = ref('')
  const error = ref('')
  const loading = ref(false)
  const router = useRouter()
  
  async function onSubmit() {
    error.value = ''
    loading.value = true
    try {
      const res = await $fetch('/auth/login', {
        method: 'POST',
        baseURL: 'http://localhost:3000',
        body: { email: email.value, password: password.value }
      })
      const token = res.data.token
      localStorage.setItem('token', token)
      router.push('/user')
    } catch (e) {
      error.value = (e && e.data && e.data.message) || e.message || 'Login failed'
    } finally {
      loading.value = false
    }
  }
  </script>
  
  <style>
  body {
    margin: 0;
  }
  </style>
  