import react from '@vitejs/plugin-react-swc'
import path from 'node:path'
import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'

import appConfig from './app.config'

export default defineConfig({
  plugins: [react(), checker({ typescript: true })],
  resolve: {
    alias: [
      { find: 'src', replacement: path.resolve(__dirname, 'src') },
      { find: '~', replacement: __dirname },
    ],
  },
  optimizeDeps: {
    exclude: ['electron'],
  },
  build: {
    emptyOutDir: false,
    outDir: appConfig.OUTDIR,
  },
})
