import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// GitHub Pages project site: https://<user>.github.io/<repo>/
// Production builds must use base: '/<repo>/' so JS/CSS load from the subpath.
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/resume/' : '/',
}))
