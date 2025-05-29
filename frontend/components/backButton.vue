<!-- components/BackButton.vue -->
<template>
    <button
      @click="goBack"
      class="px-3 py-1 text-sm text-gray-500 rounded-3xl hover:bg-gray-200 hover:text-black transition cursor-pointer"
    >
      <slot>Back</slot>
    </button>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  function goBack() {
    router.back()
  }
  </script>
