import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Relative base so the built site works from any static host or sub-folder.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
