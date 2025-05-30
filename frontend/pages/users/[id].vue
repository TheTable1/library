<!-- pages/users/[id].vue -->
<template>
    <div class="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <AppSidebar />

        <main class="flex-1 p-4 lg:p-8">
            <div class="max-w-6xl mx-auto">
                <!-- 1. Loading State -->
                <div v-if="loading" class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-12 text-center border border-white/20">
                    <div class="relative w-16 h-16 mx-auto mb-6">
                        <div class="absolute inset-0 border-4 border-blue-100 rounded-full animate-pulse"></div>
                        <div class="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <p class="text-slate-600 text-lg font-medium">Loading user details...</p>
                </div>

                <!-- 2. Error State -->
                <div v-else-if="error" class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-red-100">
                    <div class="flex items-center space-x-4 text-red-600">
                        <div class="flex-shrink-0 w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
                            <UIcon name="i-lucide-alert-circle" class="text-2xl" />
                        </div>
                        <div>
                            <h3 class="font-bold text-lg">An Error Occurred</h3>
                            <p class="text-red-500 mt-1">{{ error }}</p>
                        </div>
                    </div>
                </div>

                <!-- 3. User Detail -->
                <div v-else-if="user" class="space-y-8 animate-fade-in">
                    <!-- User Header -->
                    <div class="relative overflow-hidden bg-darkblue rounded-3xl shadow-2xl">
                        
                        <div class="relative p-8 lg:p-12">
                            <div class="flex lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
                                <!-- Avatar -->
                                <div class="relative group">
                                    <div class="w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center overflow-hidden border-4 border-white/20 transition-all duration-300 ">
                                        <img v-if="user.photo" :src="user.photo" alt="User photo"
                                            class="object-cover w-full h-full transition-all duration-300 group-hover:scale-110" loading="lazy" />
                                        <UIcon v-else name="i-lucide-user" class="text-white/60 text-6xl" />
                                    </div>
                                </div>

                                <!-- User Info -->
                                <div class="flex-1 text-center lg:text-left">
                                    <h1 class="text-4xl lg:text-5xl font-bold text-white mb-3 drop-shadow-lg">
                                        {{ user.firstName }} {{ user.lastName }}
                                    </h1>
                                    <p class="text-white/90 text-lg mb-4 font-medium">{{ user.email }}</p>
                                    <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-6">
                                        <span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-white/20 backdrop-blur-sm text-white border border-white/30 transition-all duration-300 hover:bg-white/30 mb-4"
                                            :class="getRoleGradient(user.role)">
                                            <UIcon name="i-lucide-shield-check" class="mr-2 text-sm" />
                                            {{ user.role }}
                                        </span>
                                        <span class="text-white/80 text-sm font-medium bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                                            <UIcon name="i-lucide-calendar" class="mr-2 text-sm inline" />
                                            Member since {{ user.memberSince }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Information Grid -->
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <!-- Contact Information -->
                        <div class="bg-white/70 backdrop-blur-md rounded-3xl border border-slate-200/50 p-8 transition-all duration-300 hover:bg-white/80 hover:border-slate-300/60 hover:shadow-lg">
                            <div class="mb-8">
                                <h2 class="text-lg font-medium text-slate-900 mb-2">Contact Information</h2>
                                <div class="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-transparent"></div>
                            </div>
                            
                            <div class="space-y-8">
                                <div class="group">
                                    <div class="flex items-center space-x-4">
                                        <div class="w-10 h-10 rounded-2xl flex items-center justify-center bg-blue-100 transition-colors duration-200">
                                            <UIcon name="i-lucide-mail" class="text-slate-600 text-blue-600 transition-colors duration-200" />
                                        </div>
                                        <div class="flex-1">
                                            <p class="text-xs font-medium text-slate-500 mb-1">Email</p>
                                            <p class="text-slate-900 font-medium">{{ user.email }}</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="group">
                                    <div class="flex items-center space-x-4">
                                        <div class="w-10 h-10 rounded-2xl  flex items-center justify-center bg-emerald-100 transition-colors duration-200">
                                            <UIcon name="i-lucide-phone" class="text-slate-600 text-emerald-600 transition-colors duration-200" />
                                        </div>
                                        <div class="flex-1">
                                            <p class="text-xs font-medium text-slate-500 mb-1">Phone Number</p>
                                            <p class="text-slate-900 font-medium">{{ user.phone || 'Not specified' }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Account Information -->
                        <div class="bg-white/70 backdrop-blur-md rounded-3xl border border-slate-200/50 p-8 transition-all duration-300 hover:bg-white/80 hover:border-slate-300/60 hover:shadow-lg">
                            <div class="mb-8">
                                <h2 class="text-lg font-medium text-slate-900 mb-2">Account Information</h2>
                                <div class="w-12 h-0.5 bg-gradient-to-r from-purple-500 to-transparent"></div>
                            </div>
                            
                            <div class="space-y-8">
                                <div class="group">
                                    <div class="flex items-center space-x-4">
                                        <div class="w-10 h-10 rounded-2xl  flex items-center justify-center bg-purple-100 transition-colors duration-200">
                                            <UIcon name="i-lucide-shield-check" class="text-slate-600 text-purple-600 transition-colors duration-200" />
                                        </div>
                                        <div class="flex-1">
                                            <p class="text-xs font-medium text-slate-500 mb-1">Role</p>
                                            <p class="text-slate-900 font-medium capitalize">{{ user.role }}</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="group">
                                    <div class="flex items-center space-x-4">
                                        <div class="w-10 h-10 rounded-2xl  flex items-center justify-center bg-indigo-100 transition-colors duration-200">
                                            <UIcon name="i-lucide-calendar" class="text-slate-600 group-hover:text-indigo-600 transition-colors duration-200" />
                                        </div>
                                        <div class="flex-1">
                                            <p class="text-xs font-medium text-slate-500 mb-1">Member for</p>
                                            <p class="text-slate-900 font-medium">{{ getDaysAsMember(user.memberSince) }} days</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Address -->
                    <div class="bg-white/70 backdrop-blur-md rounded-3xl border border-slate-200/50 p-8 transition-all duration-300 hover:bg-white/80 hover:border-slate-300/60 hover:shadow-lg">
                        <div class="mb-8">
                            <h2 class="text-lg font-medium text-slate-900 mb-2">Address</h2>
                            <div class="w-12 h-0.5 bg-gradient-to-r from-emerald-500 to-transparent"></div>
                        </div>
                        
                        <div class="group">
                            <div class="flex items-start space-x-4">
                                <div class="w-10 h-10 rounded-2xl  flex items-center justify-center bg-emerald-100 transition-colors duration-200 flex-shrink-0 mt-1">
                                    <UIcon name="i-lucide-map-pin" class="text-slate-600 text-emerald-600 transition-colors duration-200" />
                                </div>
                                <div class="flex-1 pt-2">
                                    <p class="text-slate-900 font-medium leading-relaxed">
                                        {{ user.address || 'No address specified' }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import AppSidebar from '@/components/AppSidebar.vue'
import BackButton from '@/components/backButton.vue'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const userId = route.params.id

const user = ref(null)
const loading = ref(false)
const error = ref('')

function getToken() {
    return localStorage.getItem('token') || ''
}

function getRoleColor(role) {
    const colors = {
        admin: 'bg-red-50 text-red-700 border border-red-200',
        user: 'bg-blue-50 text-blue-700 border border-blue-200',
    }
    return colors[role.toLowerCase()] || 'bg-gray-50 text-gray-700 border border-gray-200'
}

function getRoleGradient(role) {
    const gradients = {
        admin: 'bg-gradient-to-r from-red-500/20 to-orange-500/20 border-red-300/50',
        user: 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-300/50',
    }
    return gradients[role.toLowerCase()] || 'bg-gradient-to-r from-gray-500/20 to-slate-500/20 border-gray-300/50'
}

function getDaysAsMember(memberSinceText) {
    if (!memberSinceText) return 0

    try {
        // แปลงข้อความภาษาไทยเป็น Date object
        // รูปแบบ: "25 พฤษภาคม 2568 เวลา 10:18:02"
        const thaiMonths = {
            'มกราคม': 0, 'กุมภาพันธ์': 1, 'มีนาคม': 2, 'เมษายน': 3,
            'พฤษภาคม': 4, 'มิถุนายน': 5, 'กรกฎาคม': 6, 'สิงหาคม': 7,
            'กันยายน': 8, 'ตุลาคม': 9, 'พฤศจิกายน': 10, 'ธันวาคม': 11
        }

        const parts = memberSinceText.split(' ')
        if (parts.length >= 3) {
            const day = parseInt(parts[0])
            const month = thaiMonths[parts[1]]
            const year = parseInt(parts[2]) - 543 // แปลงจาก พ.ศ. เป็น ค.ศ.

            if (!isNaN(day) && month !== undefined && !isNaN(year)) {
                const memberDate = new Date(year, month, day)
                const today = new Date()
                const diffTime = Math.abs(today - memberDate)
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
                return diffDays.toLocaleString()
            }
        }
    } catch (e) {
        console.error('Error parsing date:', e)
    }

    return 0
}

async function fetchUser() {
    loading.value = true
    error.value = ''
    try {
        const res = await $fetch(`/users/${userId}`, {
            baseURL: 'http://localhost:3000',
            headers: { Authorization: `Bearer ${getToken()}` }
        })
        user.value = res.data
    } catch (e) {
        error.value = e.data?.message || e.message || 'Unable to load user data'
    } finally {
        loading.value = false
    }
}

onMounted(fetchUser)
</script>
