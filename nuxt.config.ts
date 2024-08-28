export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,

  imports: {
    dirs: ["composables/**", "composables"],
  },

  compatibilityDate: "2024-07-22",
});
