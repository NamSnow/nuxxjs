// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/image", "@pinia/nuxt"],
  // css: ["~/assets/css/main.css"],

  devtools: { enabled: true },
  image: {
    domains: ["https://cdn.dummyjson.com"],
  },
  hooks: {
    close: () => {},
  },
});