// nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/ui'
  ],
  css: [
    '~/assets/css/tailwind.css'
  ],
  nitro: {
    compatibilityDate: '2025-05-27'
  }
})
