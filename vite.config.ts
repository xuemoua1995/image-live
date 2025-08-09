import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// import react from '@vitejs/plugin-react'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
   // host: '192.168.100.39', // Replace with your desired IP address
    port: 3000, // Replace with your desired port
  },
  resolve: {
    // alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    alias: [{ find: '@', replacement: path.resolve('src') }],
  },
})
