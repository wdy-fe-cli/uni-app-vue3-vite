import Vue from 'vue'
import App from './App'
import store from './store'
import './utils/index.js'
import './http/api.js'
import './mixins/index.js'
import './plugins/index.js'

import uView from 'uview-ui'
// 在 App.vue中隐藏了标题，App 那边获取不到标题，所以要用 document 重新赋值标题

Vue.use(uView)
Vue.prototype.$store = store

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
  ...App,
})
app.$mount()
