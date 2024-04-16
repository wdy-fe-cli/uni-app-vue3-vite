import { defineConfig } from 'vite'
import postcssConfig from './postcss.config'
import uni from '@dcloudio/vite-plugin-uni'
import uvtw from '@uni-helper/vite-plugin-uni-tailwind'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni(), uvtw()],
  server: {
    host: '0.0.0.0',
    port: '8080',
    open: true,
    cors: true,
    // Load proxy configuration from .env.development
    proxy: {
      '/api': {
        target: 'http://192.168.10.213:8002',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  css: {
    postcss: postcssConfig,
  },
})
