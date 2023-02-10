import react from '@vitejs/plugin-react-swc'
import { builtinModules } from 'node:module'
import path from 'node:path'
import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'
import electron from 'vite-plugin-electron-renderer'
import appConfig from './app.config'

export default defineConfig({
  plugins: [react(), checker({ typescript: true }), electron({ nodeIntegration: true })],
  resolve: {
    alias: [
      { find: 'src', replacement: path.resolve(__dirname, 'src') },
      { find: '~', replacement: __dirname },
    ],
  },
  build: {
    emptyOutDir: false,
    outDir: appConfig.OUTDIR,
    rollupOptions: {
      external: ['electron', ...builtinModules],
    },
  },
  optimizeDeps: { exclude: ['electron'] },
})
