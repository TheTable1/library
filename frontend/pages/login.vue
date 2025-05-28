<template>
  <div
    class="min-h-screen flex items-center justify-center bg-cover bg-center relative"
    style="background-image: url('/images/background.jpg')"
  >
    <!-- Overlay -->
    <div class="absolute inset-0 bg-gray-900/30"></div>

    <!-- Card -->
    <div
      class="relative bg-white backdrop-blur-sm rounded-xl shadow-2xl p-10 max-w-md w-full"
    >
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
        <svg
          class="w-16 h-16 text-darkblue"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M4 19H20V5H4V19ZM6 7H18V17H6V7ZM8 9H10V15H8V9ZM12 9H14V15H12V9Z"
          />
        </svg>
      </div>

      <!-- Title -->
      <h1 class="text-3xl font-extrabold text-center text-darkblue">Login</h1>

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
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
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
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
        </div>

        <div v-if="error" class="text-red-500 text-sm">{{ error }}</div>

        <button
          type="submit"
          :disabled="loading"
          class="cp w-full flex items-center justify-center gap-2 bg-darkblue text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
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
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const error = ref("");
const loading = ref(false);
const router = useRouter();

function goBack() {
  router.push("/");
}

async function onSubmit() {
  error.value = "";
  loading.value = true;
  try {
    const res = await $fetch("/auth/login", {
      method: "POST",
      baseURL: "http://localhost:3000",
      body: { email: email.value, password: password.value },
    });
    +   // ดูโครงสร้างที่จะได้กลับมาจาก API
   console.log("Login response:", res);

   const token = res.token || res.data?.token;
   if (!token) {
     throw new Error("No token in response");
   }
    localStorage.setItem("token", token);
    router.push("/user");
  } catch (e) {
    error.value =
      (e && e.data && e.data.message) || e.message || "Login failed";
  } finally {
    loading.value = false;
  }
}
</script>

<style>
body {
  margin: 0;
}
</style>
