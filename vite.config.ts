import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'

import appConfig from './app.config'

export default defineConfig({
  plugins: [react(), checker({ typescript: true })],
  optimizeDeps: {
    exclude: ['electron'],
  },
  build: {
    emptyOutDir: false,
    outDir: appConfig.OUTDIR,
  },
})
