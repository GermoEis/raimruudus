// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/raimruudus/', // sinu repo nimi
  plugins: [vue()]
})
