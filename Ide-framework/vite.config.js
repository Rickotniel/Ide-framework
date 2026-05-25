import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Jalon 1 : Vite.js est le standard actuel (CRA est déprécié)
// ESBuild compile les fichiers à la demande → démarrage instantané
export default defineConfig({
  plugins: [react()],
})
