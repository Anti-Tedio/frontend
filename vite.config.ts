import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  build: {
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/vue/') || id.includes('node_modules/@vue/')) {
            return 'vendor-vue'
          }

          if (id.includes('node_modules/vue-router') || id.includes('node_modules/pinia')) {
            return 'vendor-router-store'
          }

          if (id.includes('node_modules/vue-i18n')) {
            return 'vendor-i18n'
          }

          if (
            id.includes('node_modules/reka-ui') ||
            id.includes('node_modules/lucide-vue-next') ||
            id.includes('node_modules/class-variance-authority') ||
            id.includes('node_modules/clsx') ||
            id.includes('node_modules/tailwind-merge')
          ) {
            return 'vendor-ui'
          }

          if (
            id.includes('node_modules/vee-validate') ||
            id.includes('node_modules/@vee-validate') ||
            id.includes('node_modules/zod')
          ) {
            return 'vendor-validation'
          }

          if (id.includes('node_modules/vue3-lottie') || id.includes('node_modules/lottie-web')) {
            return 'vendor-lottie'
          }

          if (
            id.includes('node_modules/axios') ||
            id.includes('node_modules/@vueuse') ||
            id.includes('node_modules/nprogress')
          ) {
            return 'vendor-utils'
          }
        },

        // ✅ Nomes de arquivo com hash para cache busting
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const ext = assetInfo.name?.split('.').pop() ?? ''
          if (/png|jpe?g|svg|gif|webp|avif|ico/.test(ext)) {
            return 'assets/img/[name]-[hash][extname]'
          }
          if (/woff2?|ttf|eot/.test(ext)) {
            return 'assets/fonts/[name]-[hash][extname]'
          }
          if (ext === 'css') {
            return 'assets/css/[name]-[hash][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        },
      },
    },
  },
})