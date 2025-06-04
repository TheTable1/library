<template>
  <div class="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
    <AppSidebar />

    <main class="flex-1 p-4 lg:p-8">
      <div class="max-w-6xl mx-auto">
        <!-- 1. Loading State -->
        <div v-if="loadingUser || loadingLists"
          class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-12 text-center border border-white/20">
          <div class="relative w-16 h-16 mx-auto mb-6">
            <div class="absolute inset-0 border-4 border-blue-100 rounded-full animate-pulse"></div>
            <div class="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p class="text-slate-600 text-lg font-medium">Loading data...</p>
        </div>

        <!-- 2. Error State -->
        <div v-else-if="errorUser || errorLists"
          class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-red-100">
          <div class="flex items-center space-x-4 text-red-600">
            <div class="flex-shrink-0 w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
              <UIcon name="i-lucide-alert-circle" class="text-2xl" />
            </div>
            <div>
              <h3 class="font-bold text-lg">An Error Occurred</h3>
              <p class="text-red-500 mt-1">{{ errorUser || errorLists }}</p>
            </div>
          </div>
        </div>

        <!-- 3. User Detail + Lists -->
        <div v-else-if="user" class="space-y-8 animate-fade-in">
          <!-- User Header -->
          <div class="relative overflow-hidden bg-darkblue rounded-3xl shadow-2xl">
            <div class="relative p-8 lg:p-12">
              <div class="flex lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
                <!-- Avatar -->
                <div class="relative group">
                  <div
                    class="w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center overflow-hidden border-4 border-white/20 transition-all duration-300">
                    <img v-if="user.photo" :src="user.photo" alt="User photo"
                      class="object-cover w-full h-full transition-all duration-300 group-hover:scale-110"
                      loading="lazy" />
                    <UIcon v-else name="i-lucide-user" class="text-white/60 text-6xl" />
                  </div>
                </div>

                <!-- User Info -->
                <div class="flex-1 text-center lg:text-left">
                  <h1 class="text-3xl font-bold text-white mb-3 drop-shadow-lg">
                    {{ user.firstName }} {{ user.lastName }}
                  </h1>
                  <div
                    class="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-6">
                    <span
                      class="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-white/20 backdrop-blur-sm text-white border border-white/30 transition-all duration-300 hover:bg-white/30 mb-4"
                      :class="getRoleGradient(user.role)">
                      <UIcon name="i-lucide-shield-check" class="mr-2 text-sm" />
                      {{ user.role }}
                    </span>
                    <span
                      class="text-white/80 text-sm font-medium bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm mb-2">
                      User ID: {{ user.id }}
                    </span>
                    <span class="text-white/80 text-sm font-medium bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                      Member since {{ formatDateEnglish(user.memberSince) }}
                    </span>
                  </div>
                </div>
                <div>
                  <div @click="goBack"
                    class="px-3 py-2 bg-white/50 rounded-xl text-sm font-medium text-slate-800 hover:bg-white/70 cp">
                    User Details
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Information Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- 3.2 User’s List Records Card -->
            <div
              class="bg-white/80 backdrop-blur-md rounded-3xl border border-slate-200/60 p-6 lg:p-8 transition-all duration-300 hover:bg-white/90 hover:border-slate-300/60 hover:shadow-lg">
              <!-- Card Header -->
              <div class="flex items-center mb-6">
                <div
                  class="w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center bg-blue-100 text-blue-600 mr-3">
                  <UIcon name="i-lucide-book-open" class="text-2xl" />
                </div>
                <h2 class="text-xl font-semibold text-slate-900">
                  All Borrow Lists
                </h2>
              </div>
              <div class="h-0.5 w-16 bg-gradient-to-r from-blue-500 to-transparent mb-6"></div>

              <!-- If there are lists -->
              <div v-if="lists.length" class="space-y-6">
                <div v-for="list in lists" :key="list.id"
                  class="flex flex-col bg-white rounded-2xl border-l-4 p-4 shadow-sm border-blue-400 transition-colors duration-200 hover:bg-blue-50">
                  <!-- Top Row: ID + Status -->
                  <div class="flex justify-between items-center mb-3">
                    <p class="text-sm text-slate-500 font-medium">
                    </p>
                    <span class="text-xs font-semibold px-2 py-1 rounded-full text-white" :class="list.status === 'returned'
                        ? 'bg-green-500'
                        : 'bg-yellow-500'
                      ">
                      {{ list.status }}
                    </span>
                  </div>

                  <!-- Dates & Fine -->
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-700 mb-3">
                    <div class="flex gap-20">
                      <div>
                        <p class="font-medium">Loan Date:</p>
                        <p>{{ formatDateEnglish(list.loanDate) }}</p>
                      </div>
                      <div>
                        <p class="font-medium">Due Date:</p>
                        <p>{{ formatDateEnglish(list.dueDate) }}</p>
                      </div>
                      <div v-if="list.returnedDate">
                        <p class="font-medium">Returned On:</p>
                        <p>{{ formatDateEnglish(list.returnedDate) }}</p>
                      </div>
                    </div>
                    <div>
                      <p class="font-medium">Fine:</p>
                      <p>
                        {{ list.fine ? list.fine.toLocaleString() : "0" }} THB
                      </p>
                    </div>
                  </div>
                  <!-- Book Names as Chips -->
                  <div v-if="list.listBooks.length" class="mt-2">
                    <p class="text-sm text-slate-800 font-medium mb-2">
                      Books in this list:
                    </p>
                    <div class="flex flex-wrap gap-2">
                      <router-link :to="`/books/${lb.book.id}`" v-for="lb in list.listBooks" :key="lb.id"
                        class="bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full transition-colors duration-200 hover:bg-blue-200">
                        {{ lb.book.name }}
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>

              <!-- If no lists found -->
              <div v-else class="text-slate-500 italic">
                No borrow lists found.
              </div>

              <!-- Any error message -->
              <div v-if="errorLists" class="mt-4 text-red-500 text-sm">
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
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const router = useRoute();
const userId = route.params.id;
const user = ref(null);
const lists = ref([]);
const loadingUser = ref(false);
const loadingLists = ref(false);
const errorUser = ref("");
const errorLists = ref("");

function getToken() {
  return localStorage.getItem("token") || "";
}

function goBack() {
  window.history.back()
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
    errorUser.value =
      e.data?.message || e.message || "Unable to load user data";
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
    admin:
      "bg-gradient-to-r from-red-500/20 to-orange-500/20 border-red-300/50",
    user: "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-300/50",
  };
  return (
    gradients[role.toLowerCase()] ||
    "bg-gradient-to-r from-gray-500/20 to-slate-500/20 border-gray-300/50"
  );
}

onMounted(() => {
  fetchUser();
  fetchLists();
});
</script>
