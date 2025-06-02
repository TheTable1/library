<template>
    <div
      class="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style="background-image: url('/images/background.jpg')"
    >
      <!-- Overlay -->
      <div class="absolute inset-0 bg-gray-900/30"></div>
  
      <!-- Card -->
      <div
        class="relative bg-white backdrop-blur-sm rounded-xl shadow-2xl p-6 max-w-md w-full"
      >
        <!-- Back Button -->
        <button
          @click="goBack"
          class="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 transition cp"
          aria-label="Go Back"
        >
          <img src="/icon/cancel.png" alt="Cancel" class="w-5 h-5" />
        </button>
  
        <!-- Title -->
        <h1 class="text-2xl font-extrabold text-center text-darkblue mb-4">
          Register
        </h1>
  
        <!-- Form -->
        <form @submit.prevent="onSubmit" class="space-y-4">
          <div>
            <label
              for="firstName"
              class="block text-xs font-medium text-gray-700 mb-1"
            >
              First Name
            </label>
            <input
              v-model="firstName"
              type="text"
              id="firstName"
              required
              placeholder="First Name"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-gray-700 text-sm"
            />
          </div>
  
          <div>
            <label
              for="lastName"
              class="block text-xs font-medium text-gray-700 mb-1"
            >
              Last Name
            </label>
            <input
              v-model="lastName"
              type="text"
              id="lastName"
              required
              placeholder="Last Name"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-gray-700 text-sm"
            />
          </div>
  
          <div>
            <label
              for="email"
              class="block text-xs font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              v-model="email"
              type="email"
              id="email"
              required
              placeholder="Email Address"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-gray-700 text-sm"
            />
          </div>
  
          <div>
            <label
              for="password"
              class="block text-xs font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              v-model="password"
              type="password"
              id="password"
              required
              placeholder="Password"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-gray-700 text-sm"
            />
          </div>
  
          <div>
            <label
              for="confirmPassword"
              class="block text-xs font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <input
              v-model="confirmPassword"
              type="password"
              id="confirmPassword"
              required
              placeholder="Confirm Password"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-gray-700 text-sm"
            />
          </div>
  
          <div>
            <label
              for="phone"
              class="block text-xs font-medium text-gray-700 mb-1"
            >
              Phone
            </label>
            <input
              v-model="phone"
              type="text"
              id="phone"
              required
              placeholder="Phone Number"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-gray-700 text-sm"
            />
          </div>
  
          <div>
            <label
              for="address"
              class="block text-xs font-medium text-gray-700 mb-1"
            >
              Address
            </label>
            <textarea
              v-model="address"
              id="address"
              required
              rows="2"
              placeholder="Address"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-gray-700 text-sm resize-none"
            ></textarea>
          </div>
  
          <div v-if="error" class="text-red-500 text-xs">{{ error }}</div>
  
          <button
            type="submit"
            :disabled="loading"
            class="w-full flex items-center justify-center gap-1 bg-darkblue text-white font-semibold py-2 rounded-lg transition disabled:opacity-50 text-sm"
          >
            <span v-if="!loading">Sign Up</span>
            <UIcon v-else name="i-lucide-loader-2" class="animate-spin text-base" />
          </button>
  
          <p class="text-gray-400 text-xs text-center">
            Already have an account?
            <router-link to="/login" class="text-darkblue font-bold text-sm">
              Login
            </router-link>
          </p>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  
  const firstName = ref("");
  const lastName = ref("");
  const email = ref("");
  const password = ref("");
  const confirmPassword = ref("");
  const phone = ref("");
  const address = ref("");
  const error = ref("");
  const loading = ref(false);
  const router = useRouter();
  
  function goBack() {
    router.push("/");
  }
  
  async function onSubmit() {
    error.value = "";
  
    if (password.value !== confirmPassword.value) {
      error.value = "Passwords do not match";
      return;
    }
  
    loading.value = true;
    try {
      await $fetch("/users", {
        method: "POST",
        baseURL: "http://localhost:3000",
        body: {
          fName: firstName.value.trim(),
          lName: lastName.value.trim(),
          email: email.value.trim(),
          password: password.value,
          phone: phone.value.trim(),
          address: address.value.trim(),
        },
      });
  
      router.push("/login");
    } catch (e) {
      error.value =
        (e && e.data && e.data.message) || e.message || "Registration failed";
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