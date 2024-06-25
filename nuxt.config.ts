// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ["~/assets/css/main.css"],
  modules: ["nuxt-icon", "@vueuse/nuxt"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      dbHost: "0.0.0.0",
      pbAuthCookie: "pb_auth",
    },
  },
  devServer: {
    host: "0.0.0.0",
  },
});
