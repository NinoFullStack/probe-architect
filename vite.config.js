const path = require('path')
const { defineConfig } = require('vite')
const vue = require('@vitejs/plugin-vue')

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: true,
    minifySyntax: true,
    lib: {
      entry: path.resolve(__dirname, 'vue/lib/install.js'),
      name: 'Probe',
      fileName: (format) => `probe-architect.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // Add external deps here
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  plugins: [vue()],
})
