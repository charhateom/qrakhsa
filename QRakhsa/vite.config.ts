import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   optimizeDeps: {
//     exclude: ['lucide-react'],
//   },
// });


// export default defineConfig({
//   server: {
//     host: '0.0.0.0',
//     port: 5173 // optional, but helps Render detect the port
//   }
// });
// import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: ['qrakhsa-1.onrender.com']
  }
});
