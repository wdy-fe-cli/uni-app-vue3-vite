import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

export function createApp() {
  const app = createSSRApp(App)
  // 创建pinia实例
  const pinia = createPinia()
  // 使用pinia
  app.use(pinia)
  return {
    pinia,
    app,
  }
}
