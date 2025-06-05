<template>
  <div
    class="min-h-screen flex items-center justify-center bg-cover bg-center relative"
    style="background-image: url('/images/background.jpg')"
  >
    <!-- Overlay -->
    <div class="absolute inset-0 bg-gray-900/30"></div>

    <!-- Card -->
    <div class="relative bg-white backdrop-blur-sm rounded-xl shadow-2xl p-10 max-w-md w-full">
      <!-- Back Button -->
      <button
        @click="goBack"
        class="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition cp"
        aria-label="Go Back"
      >
        <img src="/icon/cancel.png" alt="Cancel" class="w-6 h-6" />
      </button>

      <!-- Logo -->
      <div class="flex justify-center mb-6">
        <svg class="w-16 h-16 text-darkblue" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4 19H20V5H4V19ZM6 7H18V17H6V7ZM8 9H10V15H8V9ZM12 9H14V15H12V9Z" />
        </svg>
      </div>

      <!-- Title -->
      <h1 class="text-3xl font-extrabold text-center text-darkblue">Login</h1>

      <!-- Form -->
      <form @submit.prevent="onSubmit" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            v-model="email"
            type="email"
            id="email"
            required
            placeholder="Enter Your Email"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-gray-400"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            v-model="password"
            type="password"
            id="password"
            required
            placeholder="Enter Your Password"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-gray-400"
          />
        </div>

        <div v-if="error" class="text-red-500 text-sm">{{ error }}</div>

        <button
          type="submit"
          :disabled="loading"
          class="mb-2 cp w-full flex items-center justify-center gap-2 bg-darkblue text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
        >
          <span v-if="!loading">Sign In</span>
          <span v-else class="loader"></span>
        </button>

        <p class="text-gray-400 mt-3">
          If you don’t have an account, please
          <router-link to="/register" class="text-darkblue font-bold">Register</router-link>
        </p>

        <p class="text-sm text-gray-600 text-center">
          &copy; {{ new Date().getFullYear() }} Library System
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"

const email = ref("")
const password = ref("")
const error = ref("")
const loading = ref(false)
const router = useRouter()

function isTokenExpired(token) {
  try {
    const base64Payload = token.split(".")[1]
    const jsonPayload = atob(base64Payload)
    const { exp } = JSON.parse(jsonPayload)
    return Date.now() >= exp * 1000
  } catch {
    return true
  }
}

function goBack() {
  router.push("/")
}

onMounted(() => {
  const existingToken = localStorage.getItem("token")
  if (existingToken) {
    if (!isTokenExpired(existingToken)) {
      router.push("/book")
    } else {
      localStorage.removeItem("token")
    }
  }
})

async function onSubmit() {
  error.value = ""
  loading.value = true

  try {
    const res = await $fetch("/auth/login", {
      method: "POST",
      baseURL: "http://localhost:3000",
      body: { email: email.value, password: password.value },
    })
    console.log("Login response:", res)

    const token = res.token || res.data?.token
    if (!token) {
      throw new Error("No token in response")
    }
    localStorage.setItem("token", token)
    router.push("/book")
  } catch (e) {
    error.value = (e && e.data && e.data.message) || e.message || "Login failed"
  } finally {
    loading.value = false
  }
}
</script>

<style>
body {
  margin: 0;
}

/* Spinner สำหรับสถานะ loading */
.loader {
  border: 2px solid #f3f3f3;
  border-top: 2px solid #ffffff;
  border-radius: 50%;
  width: 14px;
  height: 14px;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>