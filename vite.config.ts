import { defineConfig } from 'vite'
import appConfig from './app.config'

export default defineConfig({
  optimizeDeps: {
    exclude: ['electron'],
  },
  build: {
    emptyOutDir: false,
    outDir: appConfig.OUTDIR,
  },
})
