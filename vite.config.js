import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Ensure the build output matches what Render expects
  },
  server: {
    historyApiFallback: true, // This option is for Webpack, not Vite. Remove it.
  },
});
