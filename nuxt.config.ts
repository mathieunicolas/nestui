// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    port: 3002
  },
  extends: ['@nuxt/ui-pro'],
  modules: ['@nuxt/ui', '@pinia/nuxt'],
  ui: {
    global: true
  }
})
