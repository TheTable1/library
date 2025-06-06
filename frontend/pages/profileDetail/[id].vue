<template> 
  <div class="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
    <AppSidebar />

    <main class="flex-1 p-6 lg:p-10">
      <div class="max-w-4xl mx-auto">
        <!-- 1. Loading State -->
        <div
          v-if="loadingUser || loadingLists"
          class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 text-center border border-white/20"
        >
          <div class="relative w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 md:mb-6">
            <div class="absolute inset-0 border-4 border-blue-100 rounded-full animate-pulse"></div>
            <div class="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p class="text-slate-600 text-base md:text-lg font-medium">Loading data...</p>
        </div>

        <!-- 2. Error State -->
        <div
          v-else-if="errorUser || errorLists"
          class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-red-100"
        >
          <div class="flex items-center space-x-3 md:space-x-4 text-red-600">
            <div class="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-red-50 rounded-full flex items-center justify-center">
              <UIcon name="i-lucide-alert-circle" class="text-red-500 text-xl md:text-2xl" />
            </div>
            <div>
              <h3 class="font-bold text-base md:text-lg">An Error Occurred</h3>
              <p class="text-red-500 text-sm md:text-base mt-1">{{ errorUser || errorLists }}</p>
            </div>
          </div>
        </div>

        <!-- 3. User Detail + Lists -->
        <div v-else-if="user" class="space-y-8 animate-fade-in">
          <!-- User Header -->
          <div class="relative overflow-hidden bg-darkblue rounded-3xl shadow-2xl">
            <div class="relative p-6 md:p-8 lg:p-12">
              <div class="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
                <!-- Avatar -->
                <div class="relative group flex-shrink-0">
                  <div
                    class="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center overflow-hidden border-4 border-white/20 transition-transform duration-300 group-hover:scale-105"
                  >
                    <img
                      v-if="user.photo"
                      :src="user.photo"
                      alt="User photo"
                      class="object-cover w-full h-full"
                      loading="lazy"
                    />
                    <UIcon v-else name="i-lucide-user" class="text-white/60 text-5xl md:text-6xl" />
                  </div>
                </div>

                <!-- User Info -->
                <div class="flex-1 text-center lg:text-left">
                  <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 lg:mb-3 drop-shadow-lg">
                    {{ user.firstName }} {{ user.lastName }}
                  </h1>
                  <div class="flex flex-wrap justify-center lg:justify-start gap-2 md:gap-4">
                    <span
                      class="flex items-center px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold bg-white/20 text-white border border-white/30 backdrop-blur-sm"
                      :class="getRoleGradient(user.role)"
                    >
                      <UIcon name="i-lucide-shield-check" class="mr-1 md:mr-2 text-white text-xs md:text-sm" />
                      {{ user.role }}
                    </span>
                    <span
                      class="text-white/80 text-xs md:text-sm font-medium bg-white/10 px-3 py-1 md:px-4 md:py-2 rounded-full backdrop-blur-sm"
                    >
                      User ID: {{ user.id }}
                    </span>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex flex-col items-center sm:items-start gap-2 sm:gap-3 lg:mt-3">
                  <button
                    @click="goBack"
                    class="px-3 py-2 md:px-4 md:py-2 bg-white/50 rounded-xl text-xs md:text-sm font-medium text-slate-800 hover:bg-white/70 transition"
                  >
                    User Details
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Information Grid -->
          <div class="grid grid-cols-1 gap-6">
            <!-- 3.2 User’s List Records Card -->
            <div
              class="bg-white/80 backdrop-blur-md rounded-3xl border border-slate-200/60 p-4 md:p-6 lg:p-8 transition-all duration-300 hover:bg-white/90 hover:border-slate-300/60 hover:shadow-lg"
            >
              <!-- Card Header -->
              <div class="flex items-center mb-4 md:mb-6">
                <div
                  class="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 rounded-full flex items-center justify-center bg-blue-100 text-darkblue mr-3"
                >
                  <UIcon name="i-lucide-book-open" class="text-xl md:text-2xl" />
                </div>
                <h2 class="text-lg md:text-xl font-semibold text-slate-900">
                  All Borrow Lists
                </h2>
              </div>
              <div class="h-0.5 w-12 md:w-16 bg-gradient-to-r from-blue-500 to-transparent mb-4 md:mb-6"></div>

              <!-- Filter Buttons -->
              <div class="flex gap-3 mb-6">
                <button
                  @click="filterStatus = 'borrowed'"
                  :class="[
                    'px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-200',
                    filterStatus === 'borrowed'
                      ? 'bg-darkblue text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  ]"
                >
                  Borrowed
                </button>
                <button
                  @click="filterStatus = 'returned'"
                  :class="[
                    'px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-200',
                    filterStatus === 'returned'
                      ? 'bg-darkblue text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  ]"
                >
                  Returned
                </button>
              </div>

              <!-- If there are filtered lists -->
              <div v-if="filteredLists.length" class="space-y-4 md:space-y-6">
                <div
                  v-for="list in filteredLists"
                  :key="list.id"
                  class="flex flex-col bg-white rounded-2xl border-l-4 p-3 md:p-4 lg:p-5 shadow-sm border-blue-400 transition-colors duration-200 hover:bg-blue-50"
                >
                  <!-- Top Row: Status -->
                  <div class="flex justify-end items-center mb-2">
                    <span
                      class="text-xs md:text-sm font-semibold px-2 md:px-3 py-1 rounded-full text-white"
                      :class="list.status === 'returned' ? 'bg-green-500' : 'bg-yellow-500'"
                    >
                      {{ list.status }}
                    </span>
                  </div>

                  <!-- Dates & Fine -->
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 text-xs md:text-sm text-slate-700 mb-3">
                    <div class="space-y-1">
                      <p class="font-medium">Loan Date:</p>
                      <p>{{ formatDateEnglish(list.loanDate) }}</p>
                    </div>
                    <div class="space-y-1">
                      <p class="font-medium">Due Date:</p>
                      <p>{{ formatDateEnglish(list.dueDate) }}</p>
                    </div>
                    <div v-if="list.returnedDate" class="space-y-1">
                      <p class="font-medium">Returned On:</p>
                      <p>{{ formatDateEnglish(list.returnedDate) }}</p>
                    </div>
                    <div class="space-y-1">
                      <p class="font-medium">Fine:</p>
                      <p>{{ list.fine ? list.fine.toLocaleString() : "0" }} THB</p>
                    </div>
                  </div>

                  <!-- Book Names as Chips -->
                  <div v-if="list.listBooks.length" class="mt-2">
                    <p class="text-xs md:text-sm text-slate-800 font-medium mb-2">Books in this list:</p>
                    <div class="flex flex-wrap gap-2">
                      <router-link
                        :to="`/books/${lb.book.id}`"
                        v-for="lb in list.listBooks"
                        :key="lb.id"
                        class="bg-blue-100 text-darkblue text-xs md:text-sm font-medium px-2 md:px-3 py-1 rounded-full transition-colors duration-200 hover:bg-blue-200"
                      >
                        {{ lb.book.name }}
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>

              <!-- If no filtered lists found -->
              <div v-else class="text-slate-500 italic text-sm md:text-base">
                No {{ filterStatus }} lists found.
              </div>

              <!-- Any error message -->
              <div v-if="errorLists" class="mt-3 text-red-500 text-xs md:text-sm">
                Error: {{ errorLists }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import AppSidebar from "@/components/AppSidebar.vue";
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const route = useRoute();
const router = useRouter();
const userId = route.params.id;
const user = ref(null);
const lists = ref([]);
const loadingUser = ref(false);
const loadingLists = ref(false);
const errorUser = ref("");
const errorLists = ref("");
const filterStatus = ref("borrowed"); 

function getToken() {
  return localStorage.getItem("token") || "";
}

function goBack() {
  window.history.back();
}

async function fetchUser() {
  loadingUser.value = true;
  errorUser.value = "";
  try {
    const res = await $fetch(`/users/me`, {
      baseURL: "http://localhost:3000",
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    user.value = res.data;
  } catch (e) {
    errorUser.value = e.data?.message || e.message || "Unable to load user data";
  } finally {
    loadingUser.value = false;
  }
}

async function fetchLists() {
  loadingLists.value = true;
  errorLists.value = "";
  try {
    const res = await $fetch("/my-lists", {
      baseURL: "http://localhost:3000",
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    lists.value = res.data;
  } catch (e) {
    errorLists.value = e.data?.message || e.message || "Unable to load lists";
  } finally {
    loadingLists.value = false;
  }
}

function formatDateEnglish(dateString) {
  if (!dateString) return "-";
  try {
    const d = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return d.toLocaleDateString("en-US", options);
  } catch {
    return dateString;
  }
}

function getRoleGradient(role) {
  const gradients = {
    admin: "bg-gradient-to-r from-red-500/20 to-orange-500/20 border-red-300/50",
    user: "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-300/50",
  };
  return (
    gradients[role.toLowerCase()] ||
    "bg-gradient-to-r from-gray-500/20 to-slate-500/20 border-gray-300/50"
  );
}

const filteredLists = computed(() => {
  return lists.value.filter((item) => item.status === filterStatus.value);
});

onMounted(() => {
  fetchUser();
  fetchLists();
});
</script>
