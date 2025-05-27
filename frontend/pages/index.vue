<template>
  <div
    class="min-h-screen flex items-center justify-center bg-cover bg-center relative"
    style="background-image: url('/images/background.jpg')"
  >
    <div class="absolute inset-0 bg-gray-900/30"></div>

    <div class="relative z-10 text-center space-y-6 bg-white px-10 py-15 rounded-lg">
      <h1 class="text-4xl font-extrabold text-indigo-600 mb-24">
        Welcome to the Library System
      </h1>

      <NuxtLink to="/login">
        <button
          class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition"
        >
          Go to Login
        </button>
      </NuxtLink>

    </div>
  </div>
</template>
