import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves project sites from /<repo>/, so every asset URL needs
  // that prefix or the deployed page loads a blank screen.
  base: '/wedding-invitation/',
  plugins: [react()],
})
