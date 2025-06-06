<!-- pages/test-grid.vue -->
<template>
    <div class="p-4">
      <h2 class="mb-4 text-lg font-semibold">ทดสอบ Grid – ย่อ/ขยายดู</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 bg-gray-100 p-2">
        <div
          v-for="n in 12"
          :key="n"
          class="h-20 bg-indigo-500 text-green-500 flex items-center justify-center text-sm"
        >
          Box {{ n }}
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // ไม่ต้องเขียนโค้ดเพิ่มเติม
  </script>
  
  <style scoped>
  /* ไม่มี CSS เพิ่มเติม */
  </style>
  