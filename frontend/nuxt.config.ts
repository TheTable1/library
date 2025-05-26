import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  nitro: {
    compatibilityDate: '2025-05-26'
  },
  
  css: ['~/assets/css/tailwind.css'],
  modules: ['@nuxtjs/tailwindcss']
})