import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],  resolve: {
    alias:[
      {find:"@",replacement: "/src/*"},
      {find: "@components" , replacement: "/src/components"},
      {find: "@pages" , replacement: "/src/pages/index"},
      {find: "@router" , replacement: "/src/router/index.jsx"},
      {find: "@routes" , replacement: "/src/router/routes.jsx"},
      {find: "@service" , replacement: "/src/service/index.js"},
      {find: "@worker" , replacement: "/src/service/worker.js"},
      {find: "@assets" , replacement: "/src/assets/index.jsx"},
      {find: "@modal" , replacement: "/src/components/modal"},
      {find: "@validation" , replacement: "/src/utils/validation.js"},
      {find: "@notification" , replacement: "/src/utils/notification.js"},
    ],
  },
})


